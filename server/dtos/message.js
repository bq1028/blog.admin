/**
 * 消息
 * @author Philip
 */
const Dto = require('./Dto')
const messageDao = require('../daos/message')

class MessageDto extends Dto {
    constructor (messageDao) {
        super(messageDao)
    }
}

module.exports = new MessageDto(messageDao)