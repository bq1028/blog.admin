/**
 * 日志 DTO
 * @author Philip
 */
const Dto = require('./dto')
const journalDao = require('../dao/journal')

class JournalDto extends Dto {
    /**
     * 构造函数
     * @constructor
     */
    constructor () {
        super(journalDao)
    }
}
