/**
 * 角色的权限
 * @author Philip
 */

"use strict";

let Sequelize = require('sequelize');
let sequelize = require('./../sequelize');

var authority = require('./authority');
var role = require('./role');

var roleAuth = sequelize.define('roleAuth', {
    roleId: {
        type: Sequelize.INTEGER,

        references: {
            model: role,
            key: 'id'
        }    
    },
    authorityId: {
        type: Sequelize.INTEGER,

        references: {
            model: authority,
            key: 'id'
        }    
    }    
}, {
    paranoid: false,
    timestamps: true,
    underscored: true,
    freezeTableName: true
});

module.exports = roleAuth;