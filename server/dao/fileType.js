/**
 * 文件类型
 * @author Philip
 */
const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

module.exports = sequelize.define("fileType", {
    type: {
        type: Sequelize.STRING(32),
        allowNull: false
    } 
}, {
    paranoid: false,
    timestamps: true,
    underscored: false,
    freezeTableName: true
})
