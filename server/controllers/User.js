/**
 * 用户
 * @author Philip
 */
const Controller = require("./controller")
const userDto = require('../dtos/User')

class UserController extends Controller {}

module.exports = new UserController(userDto)