/**
 * 权限 控制器
 * @author Philip
 */
const Controller = require("./Controller")
const projectItemDto = require('../dtos/Permission')

class ProjectItemController extends Controller {}

module.exports = new ProjectItemController(projectItemDto)
