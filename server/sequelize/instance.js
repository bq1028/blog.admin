/**
 * 初始化orm
 * @author Philip
 */

const Sequelize = require('sequelize')
const { database, username, password, options } = require('../config/mysql')

let sequelize = new Sequelize(database, username, password, options)

sequelize
  .authenticate()
  .then(function(err) {
    console.info('Connection has been established successfully.')
  })
  .catch(function (err) {
    console.error('Unable to connect to the database:', err)
  })

module.exports = sequelize
