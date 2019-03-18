/**
 * 消息 DTO
 * @author Philip
 */
const Dto = require('./dto')
const messageDao = require('../dao/message')

class MessageDto extends Dto {}

module.exports = new MessageDto(messageDao)