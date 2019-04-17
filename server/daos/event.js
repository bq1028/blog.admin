/**
 * 附件
 * @author Philip
 */
"use strict"

const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

module.exports = sequelize.define("event", {
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
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: false,
    freezeTableName: true
})
