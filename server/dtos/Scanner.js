/**
 * 扫描
 * @author Philip
 */
const Dto = require('./Dto')
const scannerDao = require('../daos/scanner')

class ScannerDto extends Dto {}

module.exports = new ScannerDto(scannerDao)