/**
 * 附件
 * @author Philip
 */
"use strict"

const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

module.exports = sequelize.define("diary", {
    author: {
        type: Sequelize.INTEGER,
        references: {
            model: require("./user"),
            key: "id"
        },
        allowNull: false
    },
    title: {
        type: Sequelize.STRING(32),
        allowNull: false
    },    
    date: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
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

module.exports = attachment
