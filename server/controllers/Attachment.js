/**
 * 附件 控制器
 * @author Philip
 */
const Controller = require("./Controller")
const attachmentDto = require("../dto/attachment")

class Attachment extends Controller {}

module.exports = new Attachment(attachmentDto)
