/**
 * 用户
 * @author Philip
 */
const Dto = require('./Dto')
const userDao = require('../daos/user')

class UserDto extends Dto {}

module.exports = new UserDto(userDao)