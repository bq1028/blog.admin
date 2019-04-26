/**
 * 角色
 * @author Philip
 */
const Dto = require('./Dto')
const roleDao = require('../daos/role')

class RoleDto extends Dto {
    constructor (roleDao) {
        super(roleDao)
    }
}

module.exports = new RoleDto(roleDao)