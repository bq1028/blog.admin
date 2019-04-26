/**
 * 附件
 * @author Philip
 */

const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

module.exports = sequelize.define("attach", {
    title: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    fileId: {
        type: Sequelize.INTEGER,
        references: {
            model: require("./file"),
            key: "id"
        },
        allowNull: false
    },
    diaryId: {
        type: Sequelize.INTEGER,
        references: {
            model: require("./diary"),
            key: "id"
        },
        allowNull: true
    },
    eventId: {
        type: Sequelize.INTEGER,
        references: {
            model: require("./event"),
            key: "id"
        },
        allowNull: true
    },
    projectId: {
        type: Sequelize.INTEGER,
        references: {
            model: require("./project"),
            key: "id"
        },
        allowNull: true 
    },
    contentId: {
        type: Sequelize.INTEGER,
        references: {
            model: require("./content"),
            key: "id"
        },
        allowNull: true
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: false,
    freezeTableName: true
})
