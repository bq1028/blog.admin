/**
 * 附件
 * @author Philip
 */

const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

// 外键 dao
const file = require("./file")
const diaryDao = require("./diary")
const eventDao = require("./event")
const projectDao = require("./project")
const contentDao = require("./content")

module.exports = sequelize.define("attach", {
    title: {
        type: Sequelize.STRING(32),
        allowNull: false
    },
    fileId: {
        type: Sequelize.INTEGER,
        references: {
            model: fileDao,
            key: "id"
        },
        allowNull: false
    },
    diaryId: {
        type: Sequelize.INTEGER,
        references: {
            model: diaryDao,
            key: "id"
        },
        allowNull: true
    },
    eventId: {
        type: Sequelize.INTEGER,
        references: {
            model: eventDao,
            key: "id"
        },
        allowNull: true
    },
    projectId: {
        type: Sequelize.INTEGER,
        references: {
            model: projectDao,
            key: "id"
        },
        allowNull: true 
    },
    contentId: {
        type: Sequelize.INTEGER,
        references: {
            model: contentDao,
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
