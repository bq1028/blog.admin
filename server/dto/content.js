/**
 * 内容 DTO
 * @author Philip
 */
const Dto = require('./dto')
const contentDao = require('../dao/content')

class ContentDto extends Dto {
    /**
     * 构造函数
     * @constructor
     */
    constructor () {
        super(contentDao)
    }
}
