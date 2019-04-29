/**
 * 用户
 * @author Philip
 */
const Controller = require("./Controller")
const userDto = require('../dtos/User')

class UserController extends Controller {
    constructor (userDto) {
        super(userDto)
    }
}

module.exports = new UserController(userDto)