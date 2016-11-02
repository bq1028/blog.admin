/**
 * 角色的权限
 * @author Philip
 */

"use strict";

let Sequelize = require('sequelize');
let sequelize = require('./../sequelize');

var auth = require('./auth');
var role = require('./role');

var role_auth = sequelize.define('role_auth', {
    role_id: {
        type: Sequelize.INTEGER,

        references: {
            model: role,
            key: 'id'
        }    
    },
    auth_id: {
        type: Sequelize.INTEGER,

        references: {
            model: auth,
            key: 'id'
        }    
    }    
}, {
    paranoid: false,
    timestamps: true,
    underscored: true,
    freezeTableName: true
});

module.exports = role_auth;