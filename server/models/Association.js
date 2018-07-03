var sequelize = require('./sequelize');

var authority = require('./schemas/authority');
var role = require('./schemas/role');
var user = require('./schemas/user');
var file = require('./schemas/file');
var tag = require('./schemas/tag');
var content = require('./schemas/content');
var message = require('./schemas/message');
var journal = require('./schemas/journal');
var attachment = require('./schemas/attachment');

var roleAuth = require('./schemas/role-authority');

module.exports.init = function() {
  authority.belongsToMany(role, { 
    through: roleAuth, 
    foreignKey: 'roleId', 
    as: 'roles'
  });

  role.belongsToMany(authority, { 
    through: roleAuth, 
    foreignKey: 'authId', 
    as: 'auths'
  });

  user.belongsTo(role, {
    foreignKey: 'roleId',
    constraints: false,
    as: 'role'
  });

  journal.belongsTo(user, {
    foreignKey: 'roleId',
    constraints: false,
    as: 'role'
  });

  content.hasMany(attachment, {
    foreignKey: 'contentId',
    constraints: false,
    as: 'attachments'
  });

  content.hasMany(message, {
    foreignKey: 'contentId',
    constraints: false,
    as: 'messages'
  });

  attachment.hasOne(file, {
    foreignKey: 'fileId',
    constraints: false,
    as: 'file'
  });

  attachment.belongsTo(user, {
    foreignKey: 'userId',
    constraints: false,
    as: 'owner'
  });
}
