/**
 * 内容的owner
 * @author Philip
 */

"use strict";

let Sequelize = require('sequelize');
let sequelize = require('./../sequelize');

var file = require('./file');
var content = require('./content');

var contentUser = sequelize.define('content_user', {
    fileId: {
        type: Sequelize.INTEGER,

        references: {
            model: file,
            key: 'id'
        }    
    },
    type: {
        type: Sequelize.STRING,

        references: {
            model: file,
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