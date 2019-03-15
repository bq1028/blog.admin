/**
 * mysql 配置
 * @author Philip
 */

module.exports = {
    database: 'blog',
    username: 'admin',
    password: 'Wowcxy2008',
    options: {
        host: '127.0.0.1',
        port: '3306',
        dialect: 'mysql',
        dialectOptions: {
          charset: 'utf8mb4',
        },
        pool: {
          max: 25,
          min: 0,
          idle: 10000,
        }
    }
}