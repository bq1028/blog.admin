/**
 * 日志 DTO
 * @author Philip
 */
const Dto = require('./dto')
const journalDao = require('../dao/journal')

class JournalDto extends Dto {}

module.exports = new JournalDto(journalDao)
