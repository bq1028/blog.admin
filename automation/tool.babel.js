import glob from 'glob';
import path from 'path';

import filter from "gulp-filter";

import revHash from 'rev-hash';
import through  from 'through2';
import del from 'del';

import fs from 'fs';

var gulptool = {};

function transformFilename(file) {
    return revHash(file.contents);
}

/*
 * 生成MD5版本号
 * @params { object } file对象
 * @return { string } 版本号
 */
gulptool.buildMd5 = function () {

    var sourcemaps = [];
    var pathMap = {};

    return through.obj(function (file, enc, cb) {
        
        cb(null, file);
    }, function (cb) {
        cb();
    });
};

/**
 * Calculate a 32 bit FNV-1a hash
 * @param {string} str the input value
 * @param {boolean} [asString=false] set to true to return the hash value as 
 *     8-digit hex string instead of an integer
 * @param {integer} [seed] optionally pass the hash of the previous chunk
 * @returns {integer | string}
 */
gulptool.hashFnv32a = function (str, asString, seed) {

    var i, 
        l,
        hval = ( seed === undefined ) ? 0x811c9dc5: seed;

    for (i = 0, l = str.length; i < l; i++) {
        hval ^= str.charCodeAt(i);
        hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
    }

    if (asString) {
        // Convert to 8 digit hex string
        return ("0000000" + (hval >>> 0).toString(16)).substr( - 8);
    }

    return hval >>> 0;
};

/*
 * 过滤和移除
 * @params {object} file对象
 * @return {boolean} 是否合并
 */
function filterAdd_Del (file) {
    if(file.event === 'add') { 
        return true;
    } else {
        if(file.event === 'unlink') {
            var source = './assets/develop';
            var path = file.path.replace(/\\/g, '/');

            source += path.split('/static')[1];

            del.sync([source]);
        }

        return false;
    }
};

gulptool.filterAdd_Del = filter(filterAdd_Del);

/*
 * 获取
 * @params {object} golbPath对象
 * @return {array} 
 */
gulptool.entries = function (globPath) {
    var files = glob.sync(globPath);
    var entries = {}, entry, dirname, basename;

    for (var i = 0; i < files.length; i++) {
        entry = files[i];
        dirname = path.dirname(entry);
        basename = path.basename(entry, '.js');
        entries[path.join(dirname, basename)] = './' + entry;
    }

    return entries;
};

/*
 * 读取模块配置文件
 * @return {object} 配置对象
 */
gulptool.readConfig = function () {
    return JSON.parse(fs.readFileSync('./config.json'));
};

/*
 * 写入模块配置文件
 * @params {stirng | buffer} 写入的数据
 * @params {function} 写入回调函数
 * @return none
 */
gulptool.writeConfig = function (data, callback) {
    var str = JSON.stringify(data, null, 4);

    return fs.writeFile('./config.json', str, {}, callback);
};

/*
 * 读取hash配置
 * @return none
 */
gulptool.readManifest = function () {
    return JSON.parse(fs.readFileSync('./assets/production/manifest.json'));
};

export default gulptool;