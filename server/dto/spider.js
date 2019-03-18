/**
 * 扫描
 * @author Philip
 */
const Dto = require('./dto')
const spiderDao = require('../dao/spider')

class SpiderDto extends Dto {}

module.exports = new SpiderDto(spiderDao)