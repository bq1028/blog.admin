/**
 * 日志
 * @author Philip
 */

const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

// models
const user = require("./user")

const journal = sequelize.define("journal", {
    target: {
        type: Sequelize.STRING,
        allowNull: false   
    },
    action: {
        type: Sequelize.STRING,
        allowNull: false       
    },
    response: {
        type: Sequelize.STRING,
        allowNull: false  
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

module.exports = journal
