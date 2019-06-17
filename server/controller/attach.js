/**
 * 附件
 * @author Philip
 */
const Controller = require("./Controller")
const attachDto = require("../dtos/attach")

class AttachController extends Controller {
    constructor (attachDto) {
        super(attachDto)
    }
}

module.exports = new AttachController(attachDto)
