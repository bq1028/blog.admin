/**
 * 角色模型
 * @author Philip
 */

const Sequelize = require('sequelize')
const sequelize = require('../sequelize/instance')

const role = sequelize.define('role', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false        
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: true,
    freezeTableName: true
})


module.exports = role
