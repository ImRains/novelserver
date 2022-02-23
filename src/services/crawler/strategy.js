const Crawler = require('crawler')

class Strategy {
    constructor(options){
        let { BaseUrl } = options
        this.BASE = BaseUrl
    }

    // 生成爬虫实例
    getCrawler (callback) {
        return new Crawler({
            maxConnections: 10,
            retries: 20,
            timeout: 50000,
            rateLimit: 600,
            retryTimeout: 600,
            // 这个回调每个爬取到的页面都会触发
            callback: function (error, res, done) {
                callback(error, res)
                done();
            }
        });
    }
}

module.exports = Strategy