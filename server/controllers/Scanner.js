/**
 * 扫描
 * @author Philip
 */
const Controller = require("./controller")
const scannerDto = require('../dtos/Scanner')

class ScannerController extends Controller {}

module.exports = new ScannerController(scannerDto)