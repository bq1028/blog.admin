/**
 * 角色 控制器
 * @author Philip
 */
const Controller = require("./controller")
const RoleDto = require('../dto/role')

class Role extends Controller {}

module.exports = new Role(RoleDto)