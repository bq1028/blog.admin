/**
 * 基础数据
 * @author Philip
 */

const user = require('../dao/user')
const role = require('../dao/role')

module.exports.init = () => {
    let arr = [
        role.findOrCreate({
            where: {
                id: 1
            },
            defaults: {
                name: 'administrator',
                description: '最高权限用户',
                createAt: new Date(),
                updateAt: new Date()
            }
        }),
        user.findOrCreate({
            where: {
                id: 1
            },
            defaults: {
                username: 'admin',
                password: 'youcanguess',
                nick: '菲利普',
                mobile: '18305933239',
                email: 'wowcxy2008@126.com',
                avatar: null,
                birth: new Date('1990-03-21 06:06:06'),
                description: null,
                tags: [],
                roleId: '1',
                createAt: new Date(),
                updateAt: new Date()
            }
        })               
    ]

    Promise.all(arr).then(function () {
        console.info('base date inited')
    },function() {
        console.error(arguments)
    })
}
