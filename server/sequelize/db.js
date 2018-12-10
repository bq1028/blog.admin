/**
 * 同步数据库
 * @author Philip
 */

var fs = require("fs")
var path = require("path")

var sequelize = require('./sequelize')
var normalizedPath = path.join(__dirname, "schemas")

module.exports = function() {
    var arr = []

    fs.readdirSync(normalizedPath).forEach(function(file) {
        var name = file.replace('.js', '')
        var model = require("./schemas/" + file)
        
        arr.push(model)
    })

    require('./association').init()
           

    sequelize.sync().then(function () {
        require('./base').init()
    }).catch(function (err) {
        restart(err)
    })
}
