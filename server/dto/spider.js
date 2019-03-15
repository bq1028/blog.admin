/**
 * 扫描
 * @author Philip
 */
const Dto = require('./dto')
const spiderDao = require('../dao/spider')

class SpiderDto extends Dto {
    /**
     * 构造函数
     * @constructor
     */
    constructor () {
        super(spiderDao)
    }
}
