/**
 * 项目子项
 * @author Philip
 */
const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

module.exports = sequelize.define("projectItem", {
    projectId: {
        type: Sequelize.INTEGER,
        references: {
            model: require("./project"),
            key: "id"
        },
        allowNull: false
    },
    title: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    content: {
        type: Sequelize.STRING(128),
        allowNull: false
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: false,
    freezeTableName: true
})
