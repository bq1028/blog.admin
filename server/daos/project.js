/**
 * 项目
 * @author Philip
 */
const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

module.exports = sequelize.define("project", {
    author: {
        
    },
    tags: {

    },
    description: {

    },
    title: {

    },
    start: {

    },
    end: {

    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: false,
    freezeTableName: true
})
