/**
 * 标签 DTO
 * @author Philip
 */
const Dto = require('./dto')
const tagDao = require('../dao/tag')

class TagDto extends Dto {
    /**
     * 构造函数
     * @constructor
     */
    constructor () {
        super(tagDao)
    }
}



