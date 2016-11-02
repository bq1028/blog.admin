/**
 * 图片爬虫
 * @author Philip
 */

var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');

function acquireData (data) {
    var $ = cheerio.load(data);
 
    var meizi = $('.text img').toArray();
    var len = meizi.length;

    for (var i = 0; i < len; i++) {
        var src = meizi[i].attribs.src;
        var filename = parseUrlForFileName(src);  //生成文件名

        downloadImg(src ,filename, function () {});
    }
};
 
var parseUrlForFileName = function (address) {
    return path.basename(address);
};
 
var downloadImg = function (uri, filename, callback) {
    request.head(uri, function(err, res, body) {
        if (err) {
            return false;
        }

        request(uri)
            .pipe(fs.createWriteStream('./resources/' + filename))
            .on('close', callback);
    });
};

module.exports = function (url) {
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            acquireData(body);
        }
    });
};