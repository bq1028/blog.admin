/**
 * 文件 DTO
 * @author Philip
 */
const Dto = require('./dto')
const fileDao = require('../dao/file')

class FileDto extends Dto {
    /**
     * 构造函数
     * @constructor
     */
    constructor () {
        super(fileDao)
    }
}
