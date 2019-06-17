/**
 * 消息
 * @author Philip
 */
const Controller = require("./Controller")
const messageDto = require('../dtos/message')

class MessageController extends Controller {
    constructor (messageDto) {
        super(messageDto)
    }
}

module.exports = new MessageController(messageDto)
