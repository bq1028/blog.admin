/**
 * 文件模型
 * @author Philip
 */

const Sequelize = require('sequelize')
const sequelize = require('../sequelize/instance')

// models
const user = require('./user')

const file = sequelize.define('file', {
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
    ext: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    userId: {
        type: Sequelize.INTEGER,

        references: {
            model: user,
            key: 'id'
        }   
    }    
}, {
    paranoid: false,
    timestamps: true,
    underscored: true,
    freezeTableName: true
})

module.exports = file
