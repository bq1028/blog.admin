/**
 * 附件 控制器
 * @author Philip
 */

import "babel-polyfill"
import attachmentDao from "../dao/attachment"

class Attachment {
    /**
     * 获取全部附件
     * @param {Context} context
     */
    async find (ctx) {
        ctx.body = await User.find()
    }

    /**
     * 根据id查询
     * @param {Context} Koa Context
     */
    async findById (ctx) {
        try {
            const user = await User.findById(ctx.params.id)

            if (!user) {
                ctx.throw(404)
            }

            ctx.body = user
        } catch (err) {
            if (err.name === "CastError" || err.name === "NotFoundError") {
                ctx.throw(404)
            }

            ctx.throw(500)
        }
    }

    /**
     * 添加
     * @param {Context} Koa Context
     */
    async add (ctx) {
        try {
            const user = await new User(ctx.request.body).save()

            ctx.body = {
                retData: user,
                message: "注册成功"
            }
        } catch (err) {
            ctx.throw(err)
        }
    }

    /**
     * 更新
     * @param {Context} Koa Context
     */
    async update (ctx) {
        try {
            const user = await User.findByIdAndUpdate(ctx.params.id, { ...ctx.request.body, updated_at: Date.now() })

            if (!user) {
                ctx.throw(404)
            }

            const updated = await User.findById(ctx.params.id)
            ctx.body = updated
        } catch (err) {
            if (err.name === "CastError" || err.name === "NotFoundError") {
                return ctx.throw(err, 404)
            }

            ctx.throw(err.message, 500)
        }
    }

    /**
     * 删除
     * @param {Context} Context
     */
    async delete (ctx) {
        try {
            const user = await User.findByIdAndRemove(ctx.params.id)

            if (!user) {
                ctx.status = 405

                return ctx.body = {
                    message: "查无此账号"
                }
            }

            ctx.body = {
                message: "删除用户成功"
            }
        } catch (err) {
            if (err.name === "CastError" || err.name === "NotFoundError") {
                ctx.throw(404)
            }

            ctx.throw(500)
        }
    }
}

module.exports = new Attachment()
