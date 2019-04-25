/**
 * 内容
 * @author Philip
 */

const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

module.exports = sequelize.define("content", {
    title: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    keywords: {
        type: Sequelize.STRING(64),
        allowNull: true
    },    
    content: {
        type: Sequelize.STRING(8192),
        allowNull: false
    },
    author: {
        type: Sequelize.INTEGER,
        references: {
            model: require("./user"),
            key: "id"
        },
        allowNull: false
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: false,
    freezeTableName: true
})
