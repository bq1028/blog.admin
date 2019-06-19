/**
 * 文件
 * @author Philip
 */
const Dto = require('./Dto')
const fileDao = require('../daos/file')

class FileDto extends Dto {
    constructor (fileDao) {
        super(fileDao)
    }
}

module.exports = new FileDto(fileDao)
