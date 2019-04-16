/**
 * 事件
 * @author Philip
 */
const Dto = require('./Dto')
const eventDao = require('../daos/event')

class EventDto extends Dto {}

module.exports = new EventDto(eventDao)