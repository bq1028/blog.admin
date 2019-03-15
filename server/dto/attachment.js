/**
 * 附件 DTO
 * @author Philip
 */
const Dto = require('./dto')
const attachmentDao = require('../dao/attachment')

class AttachmentDto extends Dto {
    /**
     * 构造函数
     * @constructor
     */
    constructor () {
        super(attachmentDao)
    }
}

