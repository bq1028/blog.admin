/**
 * 信息模型
 * @author Philip
 */

"use strict";

let Sequelize = require('sequelize');
let sequelize = require('./../sequelize');

var user = require('./user');
var content = require('./content');

var message = sequelize.define('message', {
    message: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false        
    },
    user_id: {
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
});

module.exports = message;