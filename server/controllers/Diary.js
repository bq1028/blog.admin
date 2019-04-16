/**
 * 日志
 * @author Philip
 */
const Controller = require("./controller")
const diaryDto = require('../dtos/Diary')

class DiaryController extends Controller {}

module.exports = new DiaryController(diaryDto)
