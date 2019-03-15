/**
 * 权限 DTO
 * @author Philip
 */
const Dto = require('./dto')
const authorityDao = require('../dao/authority')

class AuthorityDto extends Dto {
    /**
     * 构造函数
     * @constructor
     */
    constructor () {
        super(authorityDao)
    }
}
