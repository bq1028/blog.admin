/**
 * 标识模型
 * @author Philip
 */

"use strict";

let Sequelize = require('sequelize');
let sequelize = require('./../sequelize');

var tag = sequelize.define('tag', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    color: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: false
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: true,
    freezeTableName: true
});

module.exports = tag;