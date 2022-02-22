const Strategy = require('../strategy')
const { search } = require('../utils')

class XibiquStrategy extends Strategy {
    constructor(options){
        super(options)
    }
    
    // 得到目录页目录跳转信息
    getChapter (sourceUrl, callback) {
        const c = this.getCrawler((error, res) => {
            if (error) {
                callback(null)
            } else {
                var $ = res.$;
                let chapter = this.parseChapter($)
                callback(chapter)
            }
        })
        c.queue([sourceUrl]);
    }

    // 得到书籍基本信息
    getNovelInfo (sourceUrl, callback) {
        const c = this.getCrawler((error, res) => {
            if (error) {
                callback(null)
            } else {
                var $ = res.$;
                let chapter = this.parseNovelInfo($)
                callback(chapter)
            }
        })
        c.queue([sourceUrl]);
    }

    // 获得全部章节小说详细内容
    getAllChapterDetail (chapters, callback) {
        if (chapters.length <= 0) return
        let allContent = ''
        let queueIndex = 0
        let c = this.getCrawler((error, res) => {
            if (error) {
                console.log(error);
                callback(null)
            } else {
                const $ = res.$;
                let detailRes = this.parseChapterDetail($, res.request.uri.href, chapters[queueIndex].name)
                allContent = allContent + detailRes.content
                queueIndex = queueIndex + 1
                if (queueIndex < chapters.length) {
                    c.queue(chapters[queueIndex].url);
                } else {
                    callback(allContent)
                }
    
            }
        })
        c.queue(chapters[queueIndex].url);
    }

    // 获得章节小说详细内容
    getSingleChapterDetail (chapterUrl, callback) {
        let c = this.getCrawler((error, res) => {
            if (error) {
                console.log(error);
                callback(null)
            } else {
                const $ = res.$;
                let detailRes = this.parseChapterDetail($)
                callback(detailRes)
            }
        })
        c.queue(chapterUrl);
    }

    //解析详细内容
    parseChapterDetail = function ($) {

        let title = $('.bookname').children()[0].children[0].data
        //console.log(title)
        let content = $('#content')
        let contentStr = '    '
        content[0].children && content[0].children.forEach((child, index) => {
            if (index > 1 && child.data) {
                contentStr = contentStr + child.data + '\r\n'
            }
        })
        contentStr = '    ' + title + '\r\n\r\n\r\n' + contentStr + +title
        contentStr = contentStr.replace(/NaN/g, '')
        return {
            title,
            content: contentStr
        }
    }

    // 解析目录页书籍基本信息
    parseNovelInfo ($) {
        let cover = $("#fmimg").children()[0].attribs['src']
        let desc =  $("#intro").children()[1].children[0].data
        let author =  $("#info").children()[1].children[0].data
        let title =  $("#info").children()[0].children[0].data
        return {
            cover,
            author,
            title,
            desc
        }
    }

    // 解析目录
    parseChapter ($) {
        let res = []
        let children = $("#list").children()
        // console.log(children[0])
        children[0].children.forEach(child => {
    
            if (child.children && child.children[0]) {
                let item = child.children[0]
                //console.log(item)
                let resObj = {
                    url: this.BASE.replace(/\/$/, '') + item.attribs['href'],
                    name: item.children[0].data
                }
                res.push(resObj)
            }
        })
        let author =  $("#info").children()[1].children[0].data
        let title =  $("#info").children()[0].children[0].data
        return {
            author,
            title,
            chapters: res
        }
    }

    // 搜索
    search = function (searchkey, cb) {
        search({
            postData: {
                searchkey
            },
            host: 'www.xbiquge.la',
            path: '/modules/article/waps.php',
            port: '443',
            success: ($) => {
                let trs = $('tr')
                let novels = []
                // 解析dom
                for (let index = 0; index < trs.length; index++) {
                    if (index > 0) {
                        let novel = {}
                        let trChildren = trs.get(index).children
                        for (let index = 0; index < trChildren.length; index++) {
    
                            let tag = trChildren[index]
    
                            if (tag.name == 'td' && tag.attribs['class'] == 'even') {
                                if (tag.children[0].name == 'a') {
                                    novel.novelsourceUrl = tag.children[0].attribs.href
                                    novel.novelName = tag.children[0].children[0].data
                                } else {
    
                                    novel.author = tag.children[0].data
                                }
                            }
    
                            if (tag.name == 'td' && tag.attribs['class'] == 'odd') {
                                if (tag.children[0].name == 'a') {
                                    novel.newChapterUrl = tag.children[0].attribs.href
                                    novel.newChapter = tag.children[0].children[0].data
                                } else {
                                    novel.date = tag.children[0].data
                                }
                            }
                        }
                        novels.push(novel)
                    }
                }
                cb(novels)
            },
            fail: () => {
                cb(null)
            }
        })
    }
}

module.exports = new XibiquStrategy({BaseUrl:'https://www.xbiquge.la/'})