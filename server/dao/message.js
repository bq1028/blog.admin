/**
 * 信息模型
 * @author Philip
 */

const Sequelize = require('sequelize')
const sequelize = require('./../sequelize')

// models
const user = require('./user')
const content = require('./content')

const message = sequelize.define('message', {
    message: {
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
    },
    contentId: {
        type: Sequelize.INTEGER,

        references: {
            model: content,
            key: 'id'
        }    
    }    
}, {
    paranoid: false,
    timestamps: true,
    underscored: true,
    freezeTableName: true
})

module.exports = message