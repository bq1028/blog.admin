/**
 * 附件
 * @author Philip
 */
const Dto = require('./Dto')
const attachDao = require('../daos/attach')

class AttachDto extends Dto {}

module.exports = new AttachDto(attachDao)