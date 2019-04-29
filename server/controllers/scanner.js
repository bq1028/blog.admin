/**
 * 扫描
 * @author Philip
 */
const Controller = require("./controller")
const scannerDto = require('../dtos/scanner')

class ScannerController extends Controller {
    constructor (scannerDto) {
        super(scannerDto)
    }
}

module.exports = new ScannerController(scannerDto)