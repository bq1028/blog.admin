/**
 * 文件类型
 * @author Philip
 */
const Controller = require("./controller")
const fileTypeDto = require('../dtos/FileType')

class FileTypeController extends Controller {}

module.exports = new FileTypeController(fileTypeDto)

