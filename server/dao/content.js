/**
 * 内容模型
 * @author Philip
 */

const Sequelize = require('sequelize')
const sequelize = require('../sequelize/instance')

// models
const user = require('./user')
const authority = require('./authority')

const content = sequelize.define('content', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    keywords: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
    },       
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
        unique: false
    },
    tags: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false        
    },
    authorityId: {
        type: Sequelize.INTEGER,

        references: {
            model: authority,
            key: 'id'
        }
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

module.exports = content
