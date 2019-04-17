/**
 * 附件
 * @author Philip
 */
"use strict"

const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

module.exports = sequelize.define("tag", {
    name: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    color: {
        type: Sequelize.STRING(32),
        allowNull: true
    },    
    description: {
        type: Sequelize.STRING(80),
        allowNull: false
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: false,
    freezeTableName: true
})
