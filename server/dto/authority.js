/**
 * 权限 DTO
 * @author Philip
 */
const Dto = require('./dto')
const authorityDao = require('../dao/authority')

class AuthorityDto extends Dto {}

module.exports = new AuthorityDto(authorityDao)
