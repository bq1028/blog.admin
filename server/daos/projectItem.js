/**
 * 附件
 * @author Philip
 */
"use strict"

const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

const projectDao = require("./project")

module.exports = sequelize.define("projectItem", {
    projectId: {
        type: Sequelize.INTEGER,
        references: {
            model: projectDao,
            key: "id"
        },
        allowNull: false
    },
    title: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    content: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: true,
    freezeTableName: true
})
