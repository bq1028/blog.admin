/**
 * 信息模型
 * @author Philip
 */

"use strict";

let Sequelize = require('sequelize');
let sequelize = require('./../sequelize');

var journal = sequelize.define('journal', {
    target: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false          
    },
    operator: {
        type: Sequelize.JSON,
        allowNull: false,
        unique: false,
        get: function() {
            var operator = this.getDataValue('operator');

            if(typeof operator === 'string') {
                return JSON.parse(operator);
            } else {
                return operator;
            }
        }
    },
    action: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false           
    },
    result: {
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