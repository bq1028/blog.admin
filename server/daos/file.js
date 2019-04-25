/**
 * 文件
 * @author Philip
 */

const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

module.exports = sequelize.define("file", {
    type: {
        type: Sequelize.INTEGER,
        references: {
            model: require("./fileType"),
            key: "id"
        },
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(32),
        allowNull: false
    },    
    path: {
        type: Sequelize.STRING(256),
        allowNull: false
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: false,
    freezeTableName: true
})
