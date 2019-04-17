/**
 * 附件
 * @author Philip
 */
"use strict"

const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

module.exports = sequelize.define("user", {
    name: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    nickname: {
        type: Sequelize.STRING(32),
        allowNull: true
    },    
    avatar: {
        type: Sequelize.STRING(128),
        allowNull: true
    },
    email: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    roleId: {
        type: Sequelize.INTEGER,
        references: {
            model: require("./role"),
            key: "id"
        },
        unique: false
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: false,
    freezeTableName: true
})
