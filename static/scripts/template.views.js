/**
 * 模块：控制器
 * @author Philip
 */

define(
    ['text!./views/index.html',
     'text!./views/journal.html',
     'text!./views/user.html',
     'text!./views/content.html',
     'text!./views/authority.html'], 
    function () {
    'use strict';

    var templates = {
        index: arguments[0],
        journal: arguments[1],
        user: arguments[2],
        content: arguments[3],
        authority: arguments[4]
    };

    return templates;
});
