/**
 * 日记
 * @author Philip
 */
const Dto = require('./Dto')
const diaryDao = require('../daos/diary')

class DiaryDto extends Dto {
    constructor (diaryDao) {
        super(diaryDao)
    }
}

module.exports = new DiaryDto(diaryDao)