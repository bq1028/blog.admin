/**
 * 爬虫
 * @author Philip
 */
const Controller = require("./controller")
const spiderDto = require('../dto/spider')

class Spider extends Controller {}

module.exports = new Spider(spiderDto)