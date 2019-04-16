/**
 * 文件
 * @author Philip
 */
const Controller = require("./controller")
const fileDto = require('../dtos/File')

class FileController extends Controller {}

module.exports = new FileController(fileDto)

