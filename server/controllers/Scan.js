/**
 * 扫描
 * @author Philip
 */
const Controller = require("./controller")
const scanDto = require('../dto/scan')

class Scan extends Controller {}

module.exports = new Scan(scanDto)