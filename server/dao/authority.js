/**
 * 权限模型
 * @author Philip
 */

const Sequelize = require('sequelize')
const sequelize = require('../sequelize/instance')

const authority = sequelize.define('authority', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false        
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: true,
    freezeTableName: true
})

module.exports = authority
