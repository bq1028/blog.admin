/**
 * ip端口扫描
 * @author Philip
 */

function scan(host, start, end, callback) {
    var net = require('net');
    var count = end - start;
    var result = [];

    console.time('start scan:');

    for (var i = start; i <= end; i ++) {
        var item = net.connect({
                host: host,
                port: i
            }, function(i) {
                return function(i) {
                    console.log('activited port:' + i);

                    result.push(i);
                    this.destroy();
                };
            }(i)
        );
 
        item.on('error', function (err) {
            if (err.errno == 'ECONNREFUSED') {
                this.destroy();
            }

            console.log('ERROR：' + err.errno);
        });
 
        item.on('close', function () {
            if(i === end){
                callback(result);

                console.timeEnd('start scan:');
                process.exit(); 
            }
        });
    }
};

module.exports = function (url) { 
    scan('192.168.253.30', 1, 65535, function (result) {
        for (var i = 0; i < result.length; i++) {
            console.log('port:' + result[i]);
        }
    });
};
