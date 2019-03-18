/**
 * 用户 DTO
 * @author Philip
 */
const Dto = require('./dto')
const userDao = require('../dao/user')

class UserDto extends Dto {}

module.exports = new UserDto(userDao)