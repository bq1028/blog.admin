/**
 * 文件
 * @author Philip
 */
const Dto = require('./Dto')
const fileDao = require('../daos/file')

class FileDto extends Dto {}

module.exports = new FileDto(fileDao)