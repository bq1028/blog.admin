/**
 * 模型关联
 * @author Philip
 */
"use strict"

const sequelize = require('../sequelize/instance')

// 模型
const RoleDao = require('../daos/Role')
const User = require('../daos/User')
const File = require('../daos/File')
const Tag = require('../daos/Tag')
const Content = require('../daos/Content')
const Message = require('../daos/Message')
const Permission = require('../daos/Permission')
const Diary = require('../daos/Diary')
const Attach = require('../daos/Attach')

/**
 * 初始化
 * @return none
 */
module.exports.init = () => {
  authority.belongsToMany(role, { 
    through: roleAuth, 
    foreignKey: 'roleId', 
    as: 'roles'
  })

  role.belongsToMany(authority, { 
    through: roleAuth, 
    foreignKey: 'authId', 
    as: 'auths'
  })

  user.belongsTo(role, {
    foreignKey: 'roleId',
    constraints: false,
    as: 'role'
  })

  journal.belongsTo(user, {
    foreignKey: 'roleId',
    constraints: false,
    as: 'role'
  })

  content.hasMany(attachment, {
    foreignKey: 'contentId',
    constraints: false,
    as: 'attachments'
  })

  content.hasMany(message, {
    foreignKey: 'contentId',
    constraints: false,
    as: 'messages'
  })

  attachment.hasOne(file, {
    foreignKey: 'fileId',
    constraints: false,
    as: 'file'
  })

  attachment.belongsTo(user, {
    foreignKey: 'userId',
    constraints: false,
    as: 'owner'
  })
}
