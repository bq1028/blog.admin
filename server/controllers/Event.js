/**
 * 事件
 * @author Philip
 */
const Controller = require("./controller")
const eventDto = require('../dtos/Event')

class EventController extends Controller {}

module.exports = new EventController(eventDto)

