/**
 * 用户模型
 * @author Philip
 */

const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

// models
const role = require("./role")

const user = sequelize.define("user", {
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    nick: {
        type: Sequelize.STRING,
        allowNull: false
    },
    mobile: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    avatar: {
        type: Sequelize.STRING,
        allowNull: true
    },
    birth: {
        type: Sequelize.DATE,
        allowNull: true
    },
    description: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    roleId: {
        type: Sequelize.INTEGER,
        references: {
            model: role,
            key: "id"
        }
    },
    createAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updateAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: true,
    freezeTableName: true
})

module.exports = user
