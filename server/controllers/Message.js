/**
 * 消息
 * @author Philip
 */
const Controller = require("./controller")
const messageDto = require('../dtos/Message')

class MessageController extends Controller {}

module.exports = new MessageController(messageDto)