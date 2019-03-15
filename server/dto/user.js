/**
 * 用户 DTO
 * @author Philip
 */
const Dto = require('./dto')
const userDao = require('../dao/user')

class UserDto extends Dto {
    /**
     * 构造函数
     * @constructor
     */
    constructor () {
        super(userDao)
    }
}

