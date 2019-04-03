/**
 * 用户 控制器
 * @author Philip
 */
const Controller = require("./controller")
const userDto = require('../dto/user')

class User extends Controller {}

module.exports = new User(userDto)