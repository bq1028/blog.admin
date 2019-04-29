/**
 * 事件
 * @author Philip
 */
const Controller = require("./controller")
const eventDto = require('../dtos/event')

class EventController extends Controller {
    constructor (eventDto) {
        super(eventDto)
    }
}

module.exports = new EventController(eventDto)

