/**
 * 角色
 * @author Philip
 */
const Controller = require("./controller")
const roleDto = require('../dto/role')

class Role extends Controller {}

module.exports = new Role(roleDto)
