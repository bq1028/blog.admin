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
