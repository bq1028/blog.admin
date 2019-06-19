/**
 * 爬虫
 * @author Philip
 */

const request = require('request')
const cheerio = require('cheerio')

/**
 * 获取站点html
 * @param {string} 站点 url
 * @return {string} html
 */
const getHtml = async (agreement, domain, port) => {
    return await request({
        url: `${agreement}://${domain}${port ? ':' + port : ''}`,
        method: 'GET',
        headers: {
            'Accept-Language': 'zh-CN,zh;q=0.8',
            'Cookie': '__utma=4454.11221.455353.21.143;'
        }
    })
}

/**
 * 分析
 * @param {string} html
 * @return {object} 分析结果
 */
const analysis = async (html) => {
    let ctx = cheerio.load(html);

    let imgs = ctx('img')
    let links = ctx('a')

    for (let i = 0, len = links.length; i < len; i ++) {
        let link = ctx(links[i]).attr('src')
        let origins = links.split(':')
    }
}

/**
 * 爬虫
 * @param {string} 网站 url
 * @return {object} 爬取结果 
 */
module.exports = async (site) => {
    let html = await getHtml(site)
    let result = await analysis(html)

    return result
}
