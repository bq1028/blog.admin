/**
 * 接口访问列表
 * @author Philip
 */
module.exports = {
    attachment: {
        query: 'GET /api/attachment',
        findById: 'GET /api/attachment/:id',
        add: 'POST /api/attachment',
        delete: 'DELETE /api/attachment',
        update: 'PUT /api/attachment'
    },
    authority: {
        query: 'GET /api/authority',
        findById: 'GET /api/authority/:id',
        add: 'POST /api/authority',
        delete: 'DELETE /api/authority',
        update: 'PUT /api/authority'
    },
    content: {
        query: 'GET /api/content',
        findById: 'GET /api/content/:id',
        add: 'POST /api/content',
        delete: 'DELETE /api/content',
        update: 'PUT /api/content'
    },
    file: {
        query: 'GET /api/file',
        findById: 'GET /api/file/:id',
        add: 'POST /api/file',
        delete: 'DELETE /api/file',
        update: 'PUT /api/file'
    },
    journal: {
        query: 'GET /api/journal',
        findById: 'GET /api/journal/:id',
        add: 'POST /api/journal',
        delete: 'DELETE /api/journal',
        update: 'PUT /api/journal'
    },
    message: {
        query: 'GET /api/message',
        findById: 'GET /api/message/:id',
        add: 'POST /api/message',
        delete: 'DELETE /api/message',
        update: 'PUT /api/message'
    },
    role: {
        query: 'GET /api/role',
        findById: 'GET /api/role/:id',
        add: 'POST /api/role',
        delete: 'DELETE /api/role',
        update: 'PUT /api/role'
    },
    tag: {
        query: 'GET /api/tag',
        findById: 'GET /api/tag/:id',
        add: 'POST /api/tag',
        delete: 'DELETE /api/tag',
        update: 'PUT /api/tag'
    },
    user: {
        query: 'GET /api/user',
        findById: 'GET /api/user/:id',
        add: 'POST /api/user',
        delete: 'DELETE /api/user',
        update: 'PUT /api/user'
    },
    scan: {
        query: 'GET /api/scan',
        scan: 'POST /api/scan',
    },
    spider: {
        query: 'GET /api/spider',
        spider: 'POST /api/spider',
    },
}