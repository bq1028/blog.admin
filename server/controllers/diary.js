/**
 * 日志
 * @author Philip
 */
const Controller = require("./Controller")
const diaryDto = require('../dtos/diary')

class DiaryController extends Controller {
    constructor (diaryDto) {
        super(diaryDto)
    }
}

module.exports = new DiaryController(diaryDto)
