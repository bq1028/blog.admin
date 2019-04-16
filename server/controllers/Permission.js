/**
 * 权限
 * @author Philip
 */
const Controller = require("./Controller")
const permissionDto = require('../dtos/Permission')

class PermissionController extends Controller {}

module.exports = new PermissionController(permissionDto)
