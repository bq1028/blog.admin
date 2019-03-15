/**
 * 消息 DTO
 * @author Philip
 */
const Dto = require('./dto')
const messageDao = require('../dao/message')

class MessageDto extends Dto {
    /**
     * 构造函数
     * @constructor
     */
    constructor () {
        super(messageDao)
    }
}
