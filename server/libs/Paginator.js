/**
 * 分页
 * @author Philip
 */

'use strict';

var _ = require('lodash');

var pagination = function (data, page_num, page_size) {
    var _data = {};
    
    _data.list = data;
    _data.page_num = page_num;
    _data.page_size = page_size;

    return _data;
};

module.exports = pagination;
