/**
 * 模型关联
 * @author Philip
 */
"use strict"

const sequelize = require('./sequelize')

const authority = require('./schemas/authority')
const role = require('./schemas/role')
const user = require('./schemas/user')
const file = require('./schemas/file')
const tag = require('./schemas/tag')
const content = require('./schemas/content')
const message = require('./schemas/message')
const journal = require('./schemas/journal')
const attachment = require('./schemas/attachment')
const roleAuth = require('./schemas/role-authority')

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
  });

  user.belongsTo(role, {
    foreignKey: 'roleId',
    constraints: false,
    as: 'role'
  })

  journal.belongsTo(user, {
    foreignKey: 'roleId',
    constraints: false,
    as: 'role'
  });

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
