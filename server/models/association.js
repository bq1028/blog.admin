var sequelize = require('./sequelize');

var auth = require('./schemas/auth');
var role = require('./schemas/role');
var user = require('./schemas/user');
var tag = require('./schemas/tag');

var role_auth = require('./schemas/role-auth');

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

    role.hasMany(user, {
        foreignKey: 'role_id',
        constraints: false,
        as: 'role'     
    });
}
