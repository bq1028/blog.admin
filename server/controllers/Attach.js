/**
 * 附件
 * @author Philip
 */
const Controller = require("./Controller")
const attachDto = require("../dtos/Attach")

class AttachController extends Controller {}

module.exports = new AttachController(attachDto)
