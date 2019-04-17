/**
 * 爬虫
 * @author Philip
 */
const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

module.exports = sequelize.define("spider", {
    domain: {
        type: Sequelize.STRING(128),
        allowNull: false
    },
    ip: {
        type: Sequelize.STRING(15),
        allowNull: false
    },
    domainLinks: {
        type: Sequelize.JSON,
        allowNull: true
    },
    images: {
        type: Sequelize.JSON,
        allowNull: true
    },
    richMedias: {
        type: Sequelize.JSON,
        allowNull: true
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: false,
    freezeTableName: true
})
