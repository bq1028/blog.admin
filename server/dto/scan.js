/**
 * 扫描
 * @author Philip
 */
const Dto = require('./dto')
const scanDao = require('../dao/scan')

class SpiderDto extends Dto {
    /**
     * 构造函数
     * @constructor
     */
    constructor () {
        super(scanDao)
    }
}
