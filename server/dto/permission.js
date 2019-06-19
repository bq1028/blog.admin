/**
 * 权限
 * @author Philip
 */
const Dto = require('./Dto')
const permissionDao = require('../daos/permission')

class PermissionDto extends Dto {
    constructor (permissionDao) {
        super(permissionDao)
    }
}

module.exports = new PermissionDto(permissionDao)
