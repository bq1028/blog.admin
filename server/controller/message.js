/**
 * 文件 控制器
 * @author Philip
 */
const Controller = require("./controller")
const messageDto = require('../dto/message')

class Message extends Controller {}

module.exports = new Message(messageDto)
