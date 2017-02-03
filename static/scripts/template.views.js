/**
 * 模块：控制器
 * @author Philip
 */

define(['text!./views/index.html',
     'text!./views/journal.html',
     'text!./views/user.html',
     'text!./views/content.html',
     'text!./views/authority.html'], 
    function (indexView, journalView, userView, contentView, authorityView) {
    'use strict';

    var templates = {
        index: indexView,
        journal: journalView,
        user: userView,
        content: contentView,
        authority: authorityView
    };

    return templates;
});
