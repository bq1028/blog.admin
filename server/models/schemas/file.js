/**
 * 文件模型
 * @author Philip
 */

"use strict";

let Sequelize = require('sequelize');
let sequelize = require('./../sequelize');

var file = sequelize.define('file', {
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
    ext: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    author_id: {
        type: Sequelize.INTEGER(11),
        references: 'user',
        referencesKey: 'id'
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: true,
    freezeTableName: true
});

module.exports = file;