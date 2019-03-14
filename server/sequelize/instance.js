/**
 * 初始化orm
 * @author Philip
 */

const Sequelize = require('sequelize')

let sequelize = new Sequelize('blog', 'root', 'Wowcxy2008', {
  host: '127.0.0.1',
  port: '3306',
  dialect: 'mysql',
  dialectOptions: {
    charset: 'utf8mb4',
  },
  pool: {
    max: 25,
    min: 0,
    idle: 10000,
  }
})

sequelize
  .authenticate()
  .then(function(err) {
    console.info('Connection has been established successfully.')
  })
  .catch(function (err) {
    console.error('Unable to connect to the database:', err)
  })

module.exports = sequelize
