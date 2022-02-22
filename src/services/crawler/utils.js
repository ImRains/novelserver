var http = require('https');
var querystring = require('querystring');
var cheerio = require('cheerio')


function search(options) {
    let {
        success,
        fail,
        header = {},
        postData,
        host,
        path,
        port = 443
    } = options

    var post_data = querystring.stringify(postData);


    var post_options = {
        host,
        port,
        path,
        method: 'post',
        headers: Object.assign({
            'Content-length': post_data.length,
            'Content-Type': 'application/x-www-form-urlencoded',
        }, header)
    };


    //Setuptherequest
    var post_req = http.request(post_options, function (res) {
        res.setEncoding('utf8');
        let data = ''
        res.on('data', (chunk) => {
            data += chunk
        });
        res.on('end', () => {
            let $ = cheerio.load(data);
            success($)
        });
        res.on('error', () => {
            fail(data)
        });
    });

    post_req.write(post_data);

    post_req.end();

}

module.exports = {
    search
}