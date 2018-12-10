/**
 * 服务器配置
 * @author Philip
 */
"use strict"

const path = require('path')
const _ = require('lodash')

const env = process.env.ENV = process.argv.pop() || 'development'

const base = {
    app: {
        root: path.normalize(path.join(__dirname, '/..')),
        env: env
    }
}

const specifics = {
    development: {
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
    production: {
        app: {
            port: 8081,
            env: 'production',
            keys: ['super-secret-blog-keys']
        }
    }
}

module.exports =  _.merge(base, specifics[env])
