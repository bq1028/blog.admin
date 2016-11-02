var sequelize = require('./sequelize');

var auth = require('./schemas/auth');
var role = require('./schemas/role');
var user = require('./schemas/user');
var message = require('./schemas/message');
var tag = require('./schemas/tag');
var content = require('./schemas/content');

var role_auth = require('./schemas/role_auth');
var content_tag = require('./schemas/content_tag');

module.exports.init = function() {
    auth.belongsToMany(role, { 
        through: role_auth, 
        foreignKey: 'role_id', 
        as: 'roles'
    });

    role.belongsToMany(auth, { 
        through: role_auth, 
        foreignKey: 'auth_id', 
        as: 'auths' 
    });

    content.belongsTo(user, { 
        foreignKey: 'user_id', 
        targetKey: 'id', 
        as: 'author' 
    });

    content.belongsTo(auth, { 
        foreignKey: 'auth_id', 
        targetKey: 'id', 
        as: 'auth' 
    });

    content.hasMany(message, { 
        foreignKey: 'content_id', 
        as: 'messages' 
    });

    message.belongsTo(user, { 
        foreignKey: 'user_id', 
        targetKey: 'id', 
        as: 'author' 
    });

    content.belongsToMany(tag, { 
        through: content_tag, 
        foreignKey: 'content_id', 
        as: 'tags' 
    });

    tag.belongsToMany(content, { 
        through: content_tag, 
        foreignKey: 'tag_id', 
        as: 'contents' 
    });

    role.hasMany(user, {
        foreignKey: 'role_id',
        constraints: false,
        as: 'role'     
    });
}
