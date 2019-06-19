/**
 * 扫描
 * @author Philip
 */
const Dto = require('./Dto')
const scannerDao = require('../daos/scanner')

class ScannerDto extends Dto {
    constructor (scannerDao) {
        super(scannerDao)
    }
}

module.exports = new ScannerDto(scannerDao)
