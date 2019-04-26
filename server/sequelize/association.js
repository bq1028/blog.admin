/**
 * 模型关联
 * @author Philip
 */
"use strict"

const sequelize = require('../sequelize/instance')

// DAOs
const attachDao = require('../daos/attach')
const contentDao = require('../daos/content')
const diaryDao = require('../daos/diary')
const eventDao = require('../daos/event')
const fileDao = require('../daos/file')
const fileTypeDao = require('../daos/fileType')
const messageDao = require('../daos/message')
const permissionDao = require('../daos/permission')
const projectDao = require('../daos/project')
const projectItemDao = require('../daos/projectItem')
const roleDao = require('../daos/role')
const scannerDao = require('../daos/scanner')
const spiderDao = require('../daos/spider')
const tagDao = require('../daos/tag')
const userDao = require('../daos/user')

/**
 * 初始化表关联
 * @return none
 */
module.exports.init = () => {
    // 附件
    attachDao.hasOne(fileDao, { 
        foreignKey: "fileId",
        as: "file" 
    })

    // 内容
    contentDao.hasMany(tagDao, {
        foreignKey: "tagId",
        as: "tags"   
    })

    contentDao.hasMany(attachDao, {
        foreignKey: "attachId",
        as: "attachs"   
    })

    contentDao.hasOne(userDao, {
        foreignKey: "userId",
        as: "user"   
    })


    // 日志
    diaryDao.hasMany(tagDao, {
        foreignKey: "tagId",
        as: "tags"   
    })

    diaryDao.hasMany(attachDao, {
        foreignKey: "attachId",
        as: "attachs"   
    })

    diaryDao.hasOne(userDao, {
        foreignKey: "userId",
        as: "user"   
    })

    // 事件
    eventDao.hasMany(tagDao, {
        foreignKey: "tagId",
        as: "tags"   
    })

    eventDao.hasMany(attachDao, {
        foreignKey: "attachId",
        as: "attachs"   
    })

    eventDao.hasOne(userDao, {
        foreignKey: "userId",
        as: "user"   
    })

    // 项目
    projectDao.hasMany(tagDao, {
        foreignKey: "tagId",
        as: "tags"   
    })

    projectDao.hasMany(projectItemDao, {
        foreignKey: "projectItemId",
        as: "projectItems"   
    })

    projectDao.hasMany(attachDao, {
        foreignKey: "attachId",
        as: "attachs"   
    })

    projectDao.hasOne(userDao, {
        foreignKey: "userId",
        as: "user"   
    })

    // 文件
    fileDao.hasOne(fileTypeDao, { 
        foreignKey: "fileTypeId",
        as: "file" 
    })  

    // 角色  
    roleDao.hasMany(permissionDao, {
        foreignKey: "permissionId",
        as: "permissions"   
    })

    // 用户
    userDao.hasOne(roleDao, {
        foreignKey: "roleId",
        as: "role"  
    })
}
