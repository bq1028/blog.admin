/**
 * 留言
 * @author Philip
 */
"use strict"

const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

module.exports = sequelize.define("message", {
    author: {
        type: Sequelize.INTEGER,
        references: {
            model: require("./user"),
            key: "id"
        },
        unique: false
    },
    title: {
        type: Sequelize.STRING(32),
        allowNull: true
    },    
    content: {
        type: Sequelize.STRING(384),
        allowNull: false
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: false,
    freezeTableName: true
})
