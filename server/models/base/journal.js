/**
 * 信息模型
 * @author Philip
 */

"use strict";

let Sequelize = require('sequelize');
let sequelize = require('./../sequelize');

var journal = sequelize.define('journal', {
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    source: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false        
    },
    destination: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false          
    },
    operator: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false   
    },
    action: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false           
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: true,
    freezeTableName: true
});

module.exports = journal;