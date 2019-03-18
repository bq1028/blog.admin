/**
 * 附件 DTO
 * @author Philip
 */
const Dto = require('./dto')
const attachmentDao = require('../dao/attachment')

class AttachmentDto extends Dto {}

module.exports = new AttachmentDto(attachmentDao)

