/**
 * 扫描
 * @author Philip
 */
const Dto = require('./dto')
const ScanDao = require('../dao/scan')

class ScanDto extends Dto {}

module.exports = new ScanDto(ScanDao)
