/**
 * 文件类型
 * @author Philip
 */
const Controller = require("./Controller")
const fileTypeDto = require('../dtos/fileType')

class FileTypeController extends Controller {
    constructor (fileTypeDto) {
        super(fileTypeDto)
    }
}

module.exports = new FileTypeController(fileTypeDto)

