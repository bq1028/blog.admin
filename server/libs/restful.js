/**
 * Restful 类
 * @author Philip
 */

'use strict';

var co = require('co');
var _ = require('lodash');
var Router = require("koa-router");

var pagination = require('./pagination');

var api = new Router();

var Restful = function (model, include) {
    this.model = model;
    this.include = include || {};

    var restful = this;

    /**
     * 代理函数
     * @returns none
     */
    this.proxy = function *() {
        var context = this;

        var REQ = context.request;
        var RES = context.response;

        var params = _.merge({}, REQ.query);

        if(context.params.id) {
            params.id = context.params.id;
        }

        if(REQ.method === 'POST' || REQ.method === 'PUT') {
            params.data = REQ.body;
        }

        switch(REQ.method) {
            case 'GET':
                yield restful.get(params, context);
                break;
            case 'POST':
                yield restful.post(params, context);
                break;
            case 'PUT':
                yield restful.put(params, context);
                break;
            case 'DELETE':
                yield restful.delete(params, context);
                break;
            default:
                this.body = 'method is not supported';
                this.status = '500';
        }
    };
};

/**
 * 根据资源和模型创建一组restful api
 * @params { String } 资源名称
 * @params { Sequelize } 数据库模型
 * @params { Function } 权限机制
 * @params { Object } 连表查询参数
 * @returns none
 */
Restful.create = function(name, model, security, include) {
    var restful = new Restful(model, include);
    var urls = this.urls(name);

    for(var i = 0, len = urls.length; i < len; i ++) {
        var urlObj = urls[i];
        var url = urlObj.url;
        var method = urlObj.method;

        this.api[method](url, security, restful.proxy);
    }
};

/**
 * 根据资源名称返回对应的路由配置
 * @params { String } 资源名称
 * @returns { Array } url名称
 */
Restful.urls = function (name) {
    var arr = [];
    var suffix = '/:id';
    var base = '/api/' + name;

    var get = [{
        url: base,
        method: 'get'
    },{
        url: base + suffix,
        method: 'get'
    }];

    var post = [{
        url: base,
        method: 'post'
    }];

    var put = [{
        url: base + suffix,
        method: 'put'
    }];

    var remove = [{
        url: base + suffix,
        method: 'delete'
    }];

    return arr.concat(get, post, put, remove);
};

Restful.api = api;

/**
 * 获取资源
 * @params { Sequelize } 数据库模型
 * @params { Function } 权限机制 
 * @returns none
 */
Restful.prototype.get = function *(params, context) {
    var _model;
    
    var query = {
        where: params
    };

    if(this.include) {
        query.include = this.include.query;
    }

    var page_num = params.page_num ? parseInt(params.page_num) : 1;
    var page_size = params.page_size ? parseInt(params.page_size) : 'infinite';

    if (!params.id) {
        if(page_size !== 'infinite') {
            var gt = (page_num - 1) * page_size;
            var lt = page_num * page_size;
            
            query.id = {
                gt: gt,
                lt: lt
            };
        }

        delete query.where.page_size;
        delete query.where.page_num;
    }

    try {
        _model = yield this.model.findAll(query);
    } catch (e) {
        context.throw(e.status || 500, e.message);
    }
    
    if(_model === null) {
        context.status = 404;
        context.body = '没有查询结果'
    } else {

        if(params.id) {
            context.body = _model[0];
        } else {
            context.body = pagination(_model, page_num, page_size);
        }
    }
};

/**
 * 创建资源
 * @params { Sequelize } 数据库模型
 * @params { Function } 权限机制 
 * @returns none
 */
Restful.prototype.post = function *(params, context) {
    if(!_.isEmpty(params)) {
        var _model;

        try {
            if(this.include.create && typeof this.include.create === 'function') {
                var association = this.include.create(params.data);
                _model = yield this.model.create(params.data).then(association);
            } else {
                _model = yield this.model.create(params.data);
            }
        } catch (e) {
            context.throw(e.status || 500, e.message);
        }
        
        if(_model === null) {
            context.status = 404;
            context.body = '未知错误，保存数据失败';
        } else {
            context.body = _model.dataValues;
        }
    } else {
        context.status = 500;
        context.body = '参数不正确，请填写正确的参数';
    }
};

/**
 * 修改资源
 * @params { Sequelize } 数据库模型
 * @params { Function } 权限机制 
 * @returns none
 */
Restful.prototype.put = function *(params, context) {
    if(!_.isEmpty(params) && params.id) {
        var _model;

        var query = {};
        var fields = [];

        for(var i in params.data) {
            fields.push(i);
        }

        query.where = { id: params.id };
        query.fields = fields;

        try {
            _model = yield this.model.update(params.data, { where: {id: params.id}, fields: fields});
        } catch (e) {
            context.throw(e.status || 500, e.message);
        }
        
        if(_model === null) {
            context.status = 404;
            context.body = '该资源未找到';
        } else {
            try {
                query = { where: { id: params.id } };

                var self = this;
                var update = this.include.update;

                context.body = yield this.model.find(query).then(function(item) {
                    if(update) {
                        var arr = [];

                        for( var i = 0, len = update.length; i < len; i ++ ) {
                            var acs = update[i];
                            arr.push(item['set' + acs.replace(acs.substring(0, 1), acs.substring(0, 1).toUpperCase())](params.data[acs]));
                        }

                        return Promise.all(arr).then(function() {
                            if(self.include.query) {
                                query.include = self.include.query;
                            }

                            return self.model.find(query);
                        });

                    } else {
                        return item;
                    }
                });
            } catch (e) {
                context.throw(e.status || 500, e.message);
            }
        }        
    } else {
        context.status = 500;
        context.body = '缺少对象id';
    }

    return params;
};

/**
 * 删除
 * @params { Sequelize } 数据库模型
 * @params { Function } 权限机制 
 * @returns none
 */
Restful.prototype.delete = function *(params, context) {
    var _model, query = {};

    if(params && params.id) {

        query.where = {
            id: params.id
        };

        try {
            var self = this;
            var update = this.include.update;

            if(update) {
                yield this.model.find(query).then(function(item) {
                    if(update) {
                        var arr = [];

                        for( var i = 0, len = update.length; i < len; i ++ ) {
                            var acs = update[i];
                            arr.push(item['set' + acs.replace(acs.substring(0, 1), acs.substring(0, 1).toUpperCase())]([]));
                        }

                        return Promise.all(arr).then(function() {
                            if(self.include.query) {
                                query.include = self.include.query;
                            }

                            return self.model.find(query);
                        });

                    }
                });
            }

            _model = yield this.model.destroy(query);
        } catch (e) {
            context.throw(e.status || 500, e.message);
        }
        
        if(_model === null) {
            context.status = 404;
            context.body = '资源未找到';
        } else {
            context.body = {
                msg: '移除成功'
            };
        }        
    } else {
        context.status = 500;
        context.body = '缺少对象id';
    }

    return params;
};

/**
 * include
 * @returns none
 */
Restful.prototype.include = function (next) {
    this.body = 'ALLOW: HEAD, GET, PUT, DELETE, OPTIONS';
};


/**
 * trace
 * @returns none
 */
Restful.prototype.trace = function (next) {
    this.body = 'you can\'t trace.';
};

/**
 * head
 * @returns none
 */
Restful.prototype.head = function (next) {
    return;
};

/**
 * 连接者
 * @returns none
 */
Restful.prototype.connect = function (next) {};

module.exports = Restful;
