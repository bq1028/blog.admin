/**
 * 内容的owner
 * @author Philip
 */

"use strict";

let Sequelize = require('sequelize');
let sequelize = require('./../sequelize');

var user = require('./user');
var content = require('./content');

var contentUser= sequelize.define('content_user', {
    content_id: {
        type: Sequelize.INTEGER,

        references: {
            model: content,
            key: 'id'
        }    
    },
    user_id: {
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

module.exports = contentUser;