/**
 * 爬虫
 * @author Philip
 */
const Controller = require("./controller")
const spiderDto = require('../dtos/Spider')

class SpiderController extends Controller {}

module.exports = new SpiderController(spiderDto)