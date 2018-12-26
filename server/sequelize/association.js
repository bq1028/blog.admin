/**
 * 模型关联
 * @author Philip
 */
"use strict"

const sequelize = require('../sequelize/instance')

// 模型
const authority = require('../dao/authority')
const role = require('../dao/role')
const user = require('../dao/user')
const file = require('../dao/file')
const tag = require('../dao/tag')
const content = require('../dao/content')
const message = require('../dao/message')
const journal = require('../dao/journal')
const attachment = require('../dao/attachment')
const roleAuth = require('../dao/role-authority')

/**
 * 初始化
 * @return none
 */
module.exports.init = function () {
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
