/**
 * 内容模型
 * @author Philip
 */

const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

// models
const user = require("./user")
const authority = require("./authority")

const content = sequelize.define("content", {
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    keywords: {
        type: Sequelize.STRING,
        allowNull: true
    },       
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    tags: {
        type: Sequelize.STRING,
        allowNull: false 
    },
    authorityId: {
        type: Sequelize.INTEGER,
        references: {
            model: authority,
            key: "id"
        }
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: user,
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

module.exports = content
