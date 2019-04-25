/**
 * 权限
 * @author Philip
 */
const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

// 权限以增删改查, curd, 1-1-1-1
module.exports = sequelize.define("permission", {
    object: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    permission: {
        type: Sequelize.INTEGER,
        allowNull: true
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: false,
    freezeTableName: true
})
