/**
 * 内容的标签
 * @author Philip
 */

"use strict";

let Sequelize = require('sequelize');
let sequelize = require('./../sequelize');

var tag = require('./tag');
var content = require('./content');

var content_tag = sequelize.define('content_tag', {
    content_id: {
        type: Sequelize.INTEGER,

        references: {
            model: content,
            key: 'id'
        }    
    },
    tag_id: {
        type: Sequelize.INTEGER,

        references: {
            model: tag,
            key: 'id'
        }    
    }
}, {
    paranoid: false,
    timestamps: true,
    underscored: true,
    freezeTableName: true
});

module.exports = content_tag;