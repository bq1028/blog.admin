/**
 * 角色 DTO
 * @author Philip
 */
const Dto = require('./dto')
const roleDao = require('../dao/role')

class UserDto extends Dto {
    /**
     * 构造函数
     * @constructor
     */
    constructor () {
        super(roleDao)
    }
}



