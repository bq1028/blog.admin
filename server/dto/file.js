/**
 * 文件 DTO
 * @author Philip
 */
const Dto = require('./dto')
const fileDao = require('../dao/file')

class FileDto extends Dto {}

module.exports = new FileDto(fileDao)
