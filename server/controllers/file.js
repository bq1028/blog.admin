/**
 * 文件
 * @author Philip
 */
const Controller = require("./Controller")
const fileDto = require('../dtos/file')

class FileController extends Controller {
    constructor (fileDto) {
        super(fileDto)
    }
}

module.exports = new FileController(fileDto)

