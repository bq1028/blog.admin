/**
 * 内容模型
 * @author Philip
 */

"use strict";

var Sequelize = require('sequelize');
var sequelize = require('./../sequelize');

var user = require('./user');
var auth = require('./auth');

var content = sequelize.define('content', {
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
    authId: {
        type: Sequelize.INTEGER,

        references: {
            model: auth,
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
});

module.exports = content;