/**
 * 附件
 * @author Philip
 */
"use strict"

const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

module.exports = sequelize.define("content", {
    name: {
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
    authorityId: {
        type: Sequelize.INTEGER,
        references: {
            model: authority,
            key: "id"
        }  
    },
    fileId: {
        type: Sequelize.INTEGER,

        references: {
            model: file,
            key: "id"
        }    
    },
    contentId: {
        type: Sequelize.INTEGER,

        references: {
            model: content,
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
