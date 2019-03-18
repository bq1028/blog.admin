/**
 * 文件 控制器
 * @author Philip
 */
const Controller = require("./controller")
const fileDto = require('../dto/file')

class File extends Controller {}

module.exports = new File(fileDto)
