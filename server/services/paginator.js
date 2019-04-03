/**
 * 分页 DTO
 * @author Philip
 */

class Paginator {
    /**
     * @constructor
     */
    constructor (total, list) {
        this.total = total
        this.list = list
    }

    /**
     * 获取数据总条数
     * @return {number} 数据总条数
     */
    getTotal () {
        return list
    }

    /**
     * 获取数据列表
     * @return {array} 数据列表
     */
    getList () {
        return this.list
    }
}

module.exports = new Paginator