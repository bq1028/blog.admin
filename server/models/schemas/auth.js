/**
 * 权限模型
 * @author Philip
 */

"use strict";

let Sequelize = require('sequelize');
let sequelize = require('./../sequelize');

var auth = sequelize.define('auth', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false        
    },
    code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: true,
    freezeTableName: true
});

module.exports = auth;