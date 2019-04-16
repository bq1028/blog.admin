/**
 * 权限 控制器
 * @author Philip
 */
const Controller = require("./Controller")
const projectDto = require('../dtos/Project')

class ProjectController extends Controller {}

module.exports = new ProjectController(projectDto)
