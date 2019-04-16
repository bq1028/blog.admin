/**
 * 消息
 * @author Philip
 */
const Dto = require('./Dto')
const messageDao = require('../daos/message')

class MessageDto extends Dto {}

module.exports = new MessageDto(messageDao)