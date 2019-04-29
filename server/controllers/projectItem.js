/**
 * 权限 控制器
 * @author Philip
 */
const Controller = require("./Controller")
const projectItemDto = require('../dtos/projectItem')

class ProjectItemController extends Controller {
    constructor (projectItemDto) {
        super(projectItemDto)
    }
}

module.exports = new ProjectItemController(projectItemDto)
