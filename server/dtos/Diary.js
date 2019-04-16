/**
 * 日记
 * @author Philip
 */
const Dto = require('./Dto')
const diaryDao = require('../daos/diary')

class DiaryDto extends Dto {}

module.exports = new DiaryDto(diaryDao)