/**
 * 权限
 * @author Philip
 */
const Controller = require("./Controller")
const permissionDto = require('../dtos/permission')

class PermissionController extends Controller {
    constructor (permissionDto) {
        super(permissionDto)
    }
}

module.exports = new PermissionController(permissionDto)
