/**
 * 日志
 * @author Philip
 */

const Sequelize = require('sequelize')
const sequelize = require('./../sequelize')

// models
const user = require('./user')

const journal = sequelize.define('journal', {
    target: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false          
    },
    action: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false           
    },
    response: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false       
    },
    userId: {
        type: Sequelize.INTEGER,

        references: {
            model: user,
            key: 'id'
        }        
    }    
}, {
    paranoid: false,
    timestamps: true,
    underscored: true,
    freezeTableName: true
})

module.exports = journal
