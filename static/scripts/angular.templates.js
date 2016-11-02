/**
 * 模块：控制器
 * @author Philip
 */

define(
    ['text!./views/index.html',
     'text!./views/journal.html',
     'text!./views/user.html',
     'text!./views/content.html'], 
    function () {
    'use strict';

    var templates = {
        templateIndex: arguments[0],
        templateJournal: arguments[1],
        templateUser: arguments[2],
        templateContent: arguments[3]
    };

    return templates;
});
