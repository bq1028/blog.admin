/**
 * 爬虫
 * @author Philip
 */
const Controller = require("./Controller")
const spiderDto = require('../dtos/Spider')

class SpiderController extends Controller {
    constructor (spiderDto) {
        super(spiderDto)
    }
}

module.exports = new SpiderController(spiderDto)