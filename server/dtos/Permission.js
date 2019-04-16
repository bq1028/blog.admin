/**
 * 权限
 * @author Philip
 */
const Dto = require('./Dto')
const permissionDao = require('../daos/permission')

class PermissionDto extends Dto {}

module.exports = new PermissionDto(permissionDao)