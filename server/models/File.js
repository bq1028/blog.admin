/**
 * 文件模型
 * @author Philip
 */

let Sequelize = require('sequelize');
let sequelize = require('./../sequelize');

var user = require('./user');

var file = sequelize.define('file', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    ext: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    url: {
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
});

module.exports = file;
