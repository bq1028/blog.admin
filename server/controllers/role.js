/**
 * 角色
 * @author Philip
 */
const Controller = require("./controller")
const roleDto = require('../dtos/role')

class RoleController extends Controller {
    constructor (roleDto) {
        super(roleDto)
    }
}

module.exports = new RoleController(roleDto)