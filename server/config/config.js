'use strict';
var path = require('path');
var _ = require('lodash');

var env = process.env.ENV = process.argv.pop() || 'development';

var base = {
    app: {
        root: path.normalize(path.join(__dirname, '/..')),
        env: env
    }
};

var specifics = {
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
};

module.exports =  _.merge(base, specifics[env]);
