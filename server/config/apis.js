/**
 * 接口访问列表
 * @author Philip
 */
module.exports = {
    attachment: {
        query: 'GET /api/attachment',
        details: 'GET /api/attachment',
        add: 'POST /api/attachment',
        delete: 'DELETE /api/attachment',
        update: 'PUT /api/attachment'
    },
    authority: {
        query: 'GET /api/authority',
        details: 'GET /api/authority',
        add: 'POST /api/authority',
        delete: 'DELETE /api/authority',
        update: 'PUT /api/authority'
    },
    content: {
        query: 'GET /api/content',
        details: 'GET /api/content',
        add: 'POST /api/content',
        delete: 'DELETE /api/content',
        update: 'PUT /api/content'
    },
    file: {
        query: 'GET /api/file',
        details: 'GET /api/file',
        add: 'POST /api/file',
        delete: 'DELETE /api/file',
        update: 'PUT /api/file'
    },
    journal: {
        query: 'GET /api/journal',
        details: 'GET /api/journal',
        add: 'POST /api/journal',
        delete: 'DELETE /api/journal',
        update: 'PUT /api/journal'
    },
    message: {
        query: 'GET /api/message',
        details: 'GET /api/message',
        add: 'POST /api/message',
        delete: 'DELETE /api/message',
        update: 'PUT /api/message'
    },
    roleAuthority: {
        query: 'GET /api/role-authority',
        details: 'GET /api/role-authority',
        add: 'POST /api/role-authority',
        delete: 'DELETE /api/role-authority',
        update: 'PUT /api/role-authority'
    },
    role: {
        query: 'GET /api/role',
        details: 'GET /api/role',
        add: 'POST /api/role',
        delete: 'DELETE /api/role',
        update: 'PUT /api/role'
    },
    tag: {
        query: 'GET /api/tag',
        details: 'GET /api/tag',
        add: 'POST /api/tag',
        delete: 'DELETE /api/tag',
        update: 'PUT /api/tag'
    },
    user: {
        query: 'GET /api/user',
        details: 'GET /api/user',
        add: 'POST /api/user',
        delete: 'DELETE /api/user',
        update: 'PUT/api/user'
    },
    scan: {
        results: 'GET /api/scan',
        scan: 'POST /api/scan',
    },
    spider: {
        results: 'GET /api/spider',
        spider: 'POST /api/spider',
    },
}