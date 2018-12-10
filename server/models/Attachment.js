/**
 * 附件
 * @author Philip
 */
"use strict"

const Sequelize = require('sequelize')
const sequelize = require('./../sequelize')

const file = require('./file')
const authority = require('./authority')
const user = require('./user')
const content = require('./content')

const attachment = sequelize.define('attachment', {
    name: {
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
    authorityId: {
        type: Sequelize.INTEGER,

        references: {
            model: authority,
            key: 'id'
        }  
    },
    fileId: {
        type: Sequelize.INTEGER,

        references: {
            model: file,
            key: 'id'
        }    
    },
    contentId: {
        type: Sequelize.INTEGER,

        references: {
            model: content,
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

module.exports = attachment
