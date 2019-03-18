/**
 * 同步数据库
 * @author Philip
 */

const fs = require("fs")
const path = require("path")

const sequelize = require('./instance')
const normalizedPath = path.join(__dirname, "../dao")

/**
 * 数据库
 * @return {none}
 */
module.exports = () => {
    let arr = []

    fs.readdirSync(normalizedPath).forEach((file) => {
        if (file !== 'association.js') {
            let name = file.replace('.js', '')
            let model = require(path.join(__dirname, `../dao/${file}`))
            
            arr.push(model)
        }
    })

    require('./association').init()

    sequelize.sync().then(() => {
        require('./base').init()
    }).catch((err) => {
        console.error(err)
    })
}
