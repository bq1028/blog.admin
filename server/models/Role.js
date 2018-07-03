/**
 * 角色模型
 * @author Philip
 */

"use strict";

let Sequelize = require('sequelize');
let sequelize = require('./../sequelize');

var role = sequelize.define('role', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    description: {
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


module.exports = role;
