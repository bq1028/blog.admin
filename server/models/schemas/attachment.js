/**
 * 附件
 * @author Philip
 */

"use strict";

var Sequelize = require('sequelize');
var sequelize = require('./../sequelize');

var file = require('./file');
var auth = require('./auth');
var content = require('./content');

var attachment = sequelize.define('attachment', {
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
    authId: {
        type: Sequelize.INTEGER,

        references: {
            model: auth,
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
    }      
}, {
    paranoid: false,
    timestamps: true,
    underscored: true,
    freezeTableName: true
});

module.exports = attachment;