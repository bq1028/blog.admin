/**
 * 角色
 * @author Philip
 */
const roleDao = require('../dao/role')

class Role {

    /**
     * 查询角色
     * @param {context} koa context
     * @param {function} next
     * @handler
     */
    async query (ctx, next) {
        ctx.body = await roleDao.find()
    }

    /**
     * 根据 id 查询角色
     * @param {context} koa context
     * @param {function} next
     * @handler
     */
    async findById (ctx, next) {
        try {
            const user = await roleDao.findById(ctx.params.id)
            if (!user) {
                ctx.throw(404)
            }
            ctx.body = user
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404)
            }
            ctx.throw(500)
        }
    }

    /**
     * 添加角色
     * @param {context} koa context
     * @param {function} next
     * @handler
     */
    async add (ctx, next) {
        try {
            const user = await new User(ctx.request.body).save()
            ctx.body = {
                retData: user,
                message: '注册成功'
            }
        } catch (err) {
            ctx.throw(err)
        }
    }

    /**
     * 更新角色
     * @param {context} koa context
     * @param {function} next
     * @handler
     */
    async update (ctx, next) {
        try {
            const user = await User.findByIdAndUpdate(ctx.params.id,
                { ...ctx.request.body, updated_at: Date.now() })
            if (!user) {
                ctx.throw(404)
            }
            const updated = await User.findById(ctx.params.id)
            ctx.body = updated
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                return ctx.throw(err, 404)
            }
            ctx.throw(err.message, 500)
        }
    }

    /**
     * 删除角色
     * @param {context} koa context
     * @param {function} next
     * @handler
     */
    async delete (ctx, next) {
        try {
            const user = await User.findByIdAndRemove(ctx.params.id)
            if (!user) {
                ctx.status = 405
                return ctx.body = {
                    message: '查无此账号'
                }
            }
            ctx.body = {
                message: '删除用户成功'
            }
        } catch (err) {
            if (err.name === 'CastError' || err.name === 'NotFoundError') {
                ctx.throw(404)
            }
            ctx.throw(500)
        }
    }
}

module.exports = new Role()
