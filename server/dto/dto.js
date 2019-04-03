/**
 * 
 * @author Philip
 */
const Paginator = require('../services/paginator')

class Dto {
    /**
     * @constructor
     */
    constructor (dao) {
        this.dao = dao
    }

    /**
     * 查询
     * @param {object} 查询条件
     * @param {object} 分页条件
     * @return {object} 查询结果
     */
    async query (filters, pagination) {
        let { pageSize, pageIndex } = pagination
        let { name, startAt, endAt } = filters

        return await this.dao.findAllAndCount({
            limit: pageSize,
            offset: (pageSize * (pageIndex - 1)),
            where: sequelize.where({
                [Op.or]: [{
                    createAt: {
                        [Op.lte]: endTime,
                        [Op.gte]: startTime
                    }
                }, {
                    updateAt: {
                        [Op.lte]: endTime,
                        [Op.gte]: startTime
                    }
                }],
                name: {
                    [Op.like]: `%${name}%`
                }
            })
        })
    }

    /**
     * 根据 id 查找实体
     * @param {string} 实体 id
     * @return {object} 查询结果
     */
    async findById (id) {
        return await this.dao.findOne({
            where: {
                id
            }
        })
    }

    /**
     * 添加实体
     * @param {object} 实体
     * @return {object} 查询结果
     */
    async add (data) {
        let createAt = new Date()
        let updateAt = new Date()

        data.createAt = createAt
        data.updateAt = updateAt

        return await this.dao.create(data)
    }

    /**
     * 更新实体
     * @param {string} 实体 id
     * @param {object} 需要更新实体
     * @return {object} 查询结果
     */
    async update (id, data) {
        let updateAt = new Date()

        data.id = id
        data.updateAt = updateAt

        return await this.dao.update(data)
    }

    /**
     * 删除实体
     * @param {string} 实体 id
     * @return {object} 查询结果
     */
    async delete (id) {
        return await this.delete.destroy({
            id
        })
    }
}

module.exports = Dto