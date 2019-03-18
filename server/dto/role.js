/**
 * 角色 DTO
 * @author Philip
 */
const Dto = require('./dto')
const roleDao = require('../dao/role')

class RoleDto extends Dto {}

module.exports = new RoleDto(roleDao)
