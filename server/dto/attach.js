/**
 * 附件
 * @author Philip
 */
const Dto = require('./Dto')
const attachDao = require('../daos/attach')

class AttachDto extends Dto {
    constructor (attachDao) {
        super(attachDao)
    }
}

module.exports = new AttachDto(attachDao)
