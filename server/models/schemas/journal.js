/**
 * 日志
 * @author Philip
 */

"use strict";

let Sequelize = require('sequelize');
let sequelize = require('./../sequelize');

let user = require('./user');

let journal = sequelize.define('journal', {
    target: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false          
    },
    action: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false           
    },
    response: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false       
    },
    userId: {
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

module.exports = journal;