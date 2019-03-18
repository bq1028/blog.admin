/**
 * 文件 控制器
 * @author Philip
 */
const Controller = require("./controller")
const journalDto = require('../dto/journal')

class Journal extends Controller {}

module.exports = new Journal(journalDto)
