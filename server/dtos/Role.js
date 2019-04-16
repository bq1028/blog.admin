/**
 * 角色
 * @author Philip
 */
const Dto = require('./Dto')
const roleDao = require('../daos/role')

class RoleDto extends Dto {}

module.exports = new RoleDto(roleDao)