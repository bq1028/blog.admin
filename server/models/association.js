var sequelize = require('./sequelize');

var auth = require('./schemas/auth');
var role = require('./schemas/role');
var user = require('./schemas/user');
var file = require('./schemas/file');
var tag = require('./schemas/tag');
var content = require('./schemas/content');
var message = require('./schemas/message');
var journal = require('./schemas/journal');
var attachment = require('./schemas/attachment');

var roleAuth = require('./schemas/role-auth');

module.exports.init = function() {
    auth.belongsToMany(role, { 
        through: roleAuth, 
        foreignKey: 'role_id', 
        as: 'roles'
    });

    role.belongsToMany(auth, { 
        through: roleAuth, 
        foreignKey: 'auth_id', 
        as: 'auths' 
    });

    role.hasMany(user, {
        foreignKey: 'roleId',
        constraints: false,
        as: 'role'     
    });

    content.hasMany(attachment, {
        foreignKey: 'attachmentId',
        constraints: false,
        as: 'role'     
    });    
}
