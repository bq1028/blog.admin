/**
 * 初始化orm
 * @author Philip
 */

'use strict';

var Sequelize = require('sequelize');

var sequelize = new Sequelize('blog', 'root', 'kknd0321', {
    host: '127.0.0.1',
    port: '3306',
    dialect: 'mysql',
    dialectOptions: {
      charset: 'utf8mb4'
    },
    pool: {
        max: 25,
        min: 0,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(function(err) {
        console.log('Connection has been established successfully.');
    })
    .catch(function (err) {
        console.log('Unable to connect to the database:', err);
    });

module.exports = sequelize;