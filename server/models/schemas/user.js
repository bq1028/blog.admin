/**
 * 用户模型
 * @author Philip
 */

"use strict";

let Sequelize = require('sequelize');
let sequelize = require('./../sequelize');

var role = require('./role');

var user = sequelize.define('user', {
    username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    nick: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
    },
    birth: {
        type: Sequelize.DATE,
        allowNull: true,
        unique: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
        primaryKey: false
    },
    roleId: {
        type: Sequelize.INTEGER,

        references: {
            model: role,
            key: 'id'
        }    
    }    
}, {
    paranoid: false,
    timestamps: true,
    underscored: true,
    freezeTableName: true
});

module.exports = user;