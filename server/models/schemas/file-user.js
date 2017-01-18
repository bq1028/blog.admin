/**
 * 内容的owner
 * @author Philip
 */

"use strict";

let Sequelize = require('sequelize');
let sequelize = require('./../sequelize');

var user = require('./user');
var file = require('./file');

var fileUser = sequelize.define('file_user', {
    file_id: {
        type: Sequelize.INTEGER,

        references: {
            model: file,
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

module.exports = fileUser;