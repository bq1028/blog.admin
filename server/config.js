/**
 * 服务器配置
 * @author Philip
 */

const path = require('path')
const _ = require('lodash')
const env = process.argv.pop().replace('NODE_ENV=', '')

const base = {
    app: {
        root: path.normalize(path.join(__dirname, '/..')),
        env
    }
}

const specifics = {
    dev: {
        app: {
            port: 3030,
            env: 'development',
            keys: ['super-secret-blog-keys']
        }
    },
    test: {
        app: {
            port: 3030,
            env: 'test',
            keys: ['super-secret-blog-keys']
        }
    },
    prod: {
        app: {
            port: 8081,
            env: 'production',
            keys: ['super-secret-blog-keys']
        }
    }
}

console.log(env, specifics)

module.exports =  _.merge(base, specifics[env])
