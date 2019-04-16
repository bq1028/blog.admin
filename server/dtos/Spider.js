/**
 * 爬虫
 * @author Philip
 */
const Dto = require('./Dto')
const spiderDao = require('../daos/spider')

class SpiderDto extends Dto {}

module.exports = new SpiderDto(spiderDao)