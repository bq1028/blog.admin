/**
 * 项目
 * @author Philip
 */
const Dto = require('./Dto')
const projectDao = require('../daos/project')

class ProjectDto extends Dto {
    constructor (projectDao) {
        super(projectDao)
    }
}

module.exports = new ProjectDto(projectDao)