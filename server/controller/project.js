/**
 * 权限 控制器
 * @author Philip
 */
const Controller = require("./Controller")
const projectDto = require('../dtos/project')

class ProjectController extends Controller {
    constructor (projectDto) {
        super(projectDto)
    }
}

module.exports = new ProjectController(projectDto)
