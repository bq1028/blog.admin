/**
 * 项目子项
 * @author Philip
 */
const Dto = require('./Dto')
const projectItemDao = require('../daos/projectItem')

class ProjectItemDto extends Dto {}

module.exports = new ProjectItemDto(projectItemDao)