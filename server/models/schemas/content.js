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
    figure: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false,
        get: function() {
            var figure = this.getDataValue('figure');

            if(figure) {
                return JSON.parse(figure);
            } else {
                return {};
            }
        }
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
    }  
}, {
    paranoid: false,
    timestamps: true,
    underscored: true,
    freezeTableName: true
});

module.exports = content;