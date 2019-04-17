/**
 * 扫描
 * @author Philip
 */

const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

module.exports = sequelize.define("scanner", {
    ip: {
        type: Sequelize.STRING,
        allowNull: false
    },
    ports: {
        type: Sequelize.JSON,
        allowNull: true
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: false,
    freezeTableName: true
})
