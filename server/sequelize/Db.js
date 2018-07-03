/**
 * 同步数据库
 * @author Philip
 */

var fs = require("fs")
var path = require("path")

var sequelize = require('./sequelize')
var normalizedPath = path.join(__dirname, "schemas")

var restart = function(error) {
    console.error('ERROR:' + error);
    console.info('restart in 3 seconds.');

    var timer = setInterval(function() {
        init();
        clearInterval(timer);
    }, 3000);
};

var init = module.exports.init = function() {
    var arr = [];

    fs.readdirSync(normalizedPath).forEach(function(file) {
        var name = file.replace('.js', '');
        var model = require("./schemas/" + file);
        
        arr.push(model);   
    });

    require('./association').init();
           

    sequelize.sync().then(function() {
        require('./base').init();
    }).catch(function (err) {
        restart(err);        
    }); 
};
