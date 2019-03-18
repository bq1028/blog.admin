/**
 * 附件 控制器
 * @author Philip
 */
const Controller = require("./controller")
const attachmentDto = require("../dto/attachment")

class Attachment extends Controller {}

module.exports = new Attachment(attachmentDto)
