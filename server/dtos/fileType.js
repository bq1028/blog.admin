/**
 * 文件类型
 * @author Philip
 */
const Dto = require('./Dto')
const fileTypeDao = require('../daos/fileType')

class FileTypeDto extends Dto {
    constructor (fileTypeDao) {
        super(fileTypeDao)
    }
}

module.exports = new FileTypeDto(fileTypeDao)