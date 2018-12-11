/**
 * 标识模型
 * @author Philip
 */

const Sequelize = require('sequelize')
const sequelize = require('./../sequelize')

const tag = sequelize.define('tag', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  color: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: false
  }
}, {
  paranoid: false,
  timestamps: true,
  underscored: true,
  freezeTableName: true
})

module.exports = tag