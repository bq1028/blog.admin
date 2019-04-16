/**
 * 角色
 * @author Philip
 */
const Controller = require("./controller")
const roleDto = require('../dtos/Role')

class RoleController extends Controller {}

module.exports = new RoleController(RoleDto)