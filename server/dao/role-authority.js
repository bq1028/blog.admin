/**
 * 角色的权限
 * @author Philip
 */

const Sequelize = require("sequelize")
const sequelize = require("../sequelize/instance")

const authority = require("./authority")
const role = require("./role")

const roleAuth = sequelize.define("roleAuth", {
    roleId: {
      type: Sequelize.INTEGER,

      references: {
        model: role,
        key: "id"
      }
    },
    authorityId: {
      type: Sequelize.INTEGER,

      references: {
        model: authority,
        key: "id"
      }
    }    
}, {
  paranoid: false,
  timestamps: true,
  underscored: true,
  freezeTableName: true
})

module.exports = roleAuth
