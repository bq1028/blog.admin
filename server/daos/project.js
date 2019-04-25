/**
 * 项目
 * @author Philip
 */
const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

module.exports = sequelize.define("project", {
    author: {
        type: Sequelize.INTEGER,
        references: {
            model: require("./user"),
            key: "id"
        },
        allowNull: false
    },
    description: {
        type: Sequelize.STRING(80),
        allowNull: false
    },
    title: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    start: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    end: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: false,
    freezeTableName: true
})
