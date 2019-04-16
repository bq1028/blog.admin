/**
 * 接口访问列表
 * @author Philip
 */
module.exports = {
    Attach: {
        query: 'GET /api/attach',
        findById: 'GET /api/attach/:id',
        add: 'POST /api/attach',
        delete: 'DELETE /api/attach',
        update: 'PUT /api/attach'
    },
    Permission: {
        query: 'GET /api/permission',
        findById: 'GET /api/permission/:id',
        add: 'POST /api/permission',
        delete: 'DELETE /api/permission',
        update: 'PUT /api/permission'
    },
    Content: {
        query: 'GET /api/content',
        findById: 'GET /api/content/:id',
        add: 'POST /api/content',
        delete: 'DELETE /api/content',
        update: 'PUT /api/content'
    },
    Event: {
        query: 'GET /api/event',
        findById: 'GET /api/event/:id',
        add: 'POST /api/event',
        delete: 'DELETE /api/event',
        update: 'PUT /api/event'
    },
    FileType: {
        query: 'GET /api/file-type',
        findById: 'GET /api/file-type/:id',
        add: 'POST /api/file-type',
        delete: 'DELETE /api/file-type',
        update: 'PUT /api/file-type'
    },
    File: {
        query: 'GET /api/file',
        findById: 'GET /api/file/:id',
        add: 'POST /api/file',
        delete: 'DELETE /api/file',
        update: 'PUT /api/file'
    },
    Diary: {
        query: 'GET /api/diary',
        findById: 'GET /api/diary/:id',
        add: 'POST /api/diary',
        delete: 'DELETE /api/diary',
        update: 'PUT /api/diary'
    },
    Message: {
        query: 'GET /api/message',
        findById: 'GET /api/message/:id',
        add: 'POST /api/message',
        delete: 'DELETE /api/message',
        update: 'PUT /api/message'
    },
    Role: {
        query: 'GET /api/role',
        findById: 'GET /api/role/:id',
        add: 'POST /api/role',
        delete: 'DELETE /api/role',
        update: 'PUT /api/role'
    },
    Tag: {
        query: 'GET /api/tag',
        findById: 'GET /api/tag/:id',
        add: 'POST /api/tag',
        delete: 'DELETE /api/tag',
        update: 'PUT /api/tag'
    },
    User: {
        query: 'GET /api/user',
        findById: 'GET /api/user/:id',
        add: 'POST /api/user',
        delete: 'DELETE /api/user',
        update: 'PUT /api/user'
    },
    Project: {
        query: 'GET /api/project',
        findById: 'GET /api/project/:id',
        add: 'POST /api/project',
        delete: 'DELETE /api/project',
        update: 'PUT /api/project'
    },
    ProjectItem: {
        query: 'GET /api/project-item',
        findById: 'GET /api/project-item/:id',
        add: 'POST /api/project-item',
        delete: 'DELETE /api/project-item',
        update: 'PUT /api/project-item'
    },
    Scanner: {
        query: 'GET /api/scanner',
        scan: 'POST /api/scanner',
    },
    Spider: {
        query: 'GET /api/spider',
        spider: 'POST /api/spider',
    }
}