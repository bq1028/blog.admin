import gulp from 'gulp';
import runSequence from 'run-sequence';

import util from 'gulp-util';                // 脚本格式校验
import spriter from 'gulp-sprite-generator';
import imagemin from 'gulp-imagemin';
import less from 'gulp-less';
import minify from 'gulp-minify-css';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import fileinclude from 'gulp-file-include';
import addsrc from 'gulp-add-src';
import fash from 'gulp-fash';
import filter from "gulp-filter";
import concatFile from 'gulp-concat';
import amdOptimize from 'amd-optimize';
import plumber from 'gulp-plumber';

import es from 'event-stream';

import gulptool from './tool.babel';


import del from 'del';
import fs from 'fs';
import q from 'q';
import path from 'path';

var config = gulptool.readConfig();

const source = 'static',
      assets = './assets',
      develop = 'develop',
      production = 'production';

/*
 * 编译样式
 */
gulp.task('compile-styles', function (cb) {
    var entry, output;
    
    if(config.styles && config.styles.state === 'develop') {
        if(config.styles.entry) {
            entry = config.styles.entry;
        } else {
            entry = './static/styles/app.less';
        }

        if(config.styles.output) {
            output = config.styles.output;
        } else {
            output = './assets/develop/styles/';
        }

        var entryArr = entry.split('/');
        var filename = entryArr[entryArr.length - 1].split('.');

        filename[1] = 'css';
        filename = filename.join('.');

        return gulp.src(entry) 
                   .pipe(less())
                   .pipe(gulp.dest(output));
    } else {
        cb();
    }
});

/*
 * 编译scripts
 */
gulp.task('compile-scripts', function (cb) {
    var entry, 
        output;

    if(config.scripts && config.scripts.state === 'develop') {
        var src = './static/scripts/**/**/**';
        var filename = 'app.js';
        var entryArr = null;

        if(config.scripts.entry) {
            entry = config.scripts.entry;

            entryArr = entry.split('/');
            filename = entryArr[entryArr.length - 1].split('.');
        }              

        if(config.scripts.output) {
            output = config.scripts.output;
        } else {
            output = './assets/develop/scripts/';
        }

        return gulp.src(src)
                   .pipe(amdOptimize(filename.replace('.js', ''), {
                        baseUrl: '',
                        paths: {
                            'text': './libs/requirejs/text',
                            'domReady': './libs/requirejs/domReady',
                            'angular': './libs/angular/angular.min',
                            'angular-route': './libs/angular-route/angular-route.min'                                
                        },
                        shim: {
                            'angular': {
                                exports: 'angular'
                            }
                        },
                        findNestedDependencies: true,
                        include: false,
                        wrapShim: false,
                        exclude: []                                           
                   }))
                   .pipe(concatFile(filename))
                   .pipe(gulp.dest(output));
    } else {
        cb();
    }
});

/*
 * 同步图片
 */
gulp.task('sync-imgs', function (cb) {
    var dest = assets + '/' + develop;

    return gulp.src('static/images/**/**')
               .pipe(gulp.dest(dest + '/images'));
});

/*
 * 同步第三方库
 */
gulp.task('sync-libs', function (cb) {
    var dest = assets + '/' + develop;

    return gulp.src('static/libs/**/**')
               .pipe(gulp.dest(dest + '/libs'));   
});

/*
 * 构建dev环境
 */
gulp.task('build-dev', function (cb) {
    runSequence(['compile-styles', 'compile-scripts', 'sync-imgs', 'sync-libs'], cb);    
});


/*
 * 压缩样式
 */
gulp.task('compress-styles', function (cb) {

    var imgDest = './assets/production/images/', 
        cssDest = './assets/production/styles/';

    var streams = [];

    if(config.styles  && config.styles.state === 'develop') {

        var styleSrc = './assets/develop/styles/*.css';
        var imgBaseUrl = './assets/develop/images/';

        // 需要自动合并雪碧图的样式文件
        var spriteData = gulp.src(styleSrc)
                             .pipe(spriter({
                                baseUrl: '../../images/slice',
                                spriteSheetPath: '../../images/slice',
                                spriteSheetName: 'sprite.png'
                             }));

        // 压缩图片
        var spriteStream = spriteData.img
                                  .pipe(imagemin())
                                  .pipe(gulp.dest(imgDest));

        // 压缩css
        var cssStream = spriteData.css
                                  .pipe(minify({
                                      advanced: false,        // 是否开启高级优化（合并选择器等）
                                      compatibility: '*',     // 启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式
                                      keepBreaks: false       // 是否保留换行          
                                  }))   
                                  .pipe(rename({suffix: '.min'}))  
                                  .pipe(gulp.dest(cssDest));

        var imgStream = gulp.src([imgBaseUrl + '/**/*', '!' + imgBaseUrl + '/slice/**/*'])
                                  .pipe(imagemin())
                                  .pipe(gulp.dest(imgDest));

        streams.push(spriteStream);
        streams.push(cssStream);
        streams.push(imgStream);

        es.concat(streams).on('end', cb);
    } else {
        cb();
    }
});

/*
 * 压缩脚本与版本号
 */
gulp.task('compress-scripts', function (cb) {

    var filename;

    var src = './assets/develop/scripts/*.js';
    var dest = './assets/production/scripts/';

    if(config.scripts && config.scripts.state === 'develop') {
        return gulp.src(src)
                   .pipe(uglify())    
                   .pipe(rename({suffix: '.min'}))  
                   .pipe(gulp.dest(dest));  
    } else {
        cb();
    }
});

/*
 * 生成脚本hash号
 */
gulp.task('hash-scripts', function (cb) { 
    var scriptBaseUrl = './assets/production/scripts/',
        scriptSources = [];

    if(config.scripts && config.scripts.state === 'develop') {
        var entry = config.scripts.entry;

        if(entry) {
            entry = entry.split('/');
            entry = entry[entry.length - 1];
            entry = entry.slice(0, entry.lastIndexOf('.')) + '.min.js';
        }

        config.scripts.state = 'production';   
        scriptSources.push(scriptBaseUrl + ( entry || 'app.min.js' ));                     
    }

    gulp.src(scriptSources, {base: scriptBaseUrl})
      .pipe(fash())
      .pipe(gulp.dest(scriptBaseUrl))
      .pipe(fash.manifest({
            path: './assets/production/manifest.json',
            merge: true
       }))
      .pipe(gulp.dest('./'))
      .on('end', function () {
        cb();
      }); 
});

/*
 * 生成样式hash号
 */
gulp.task('hash-styles', function (cb) {
    var cssBaseUrl = './assets/production/styles/',
        cssSources = [];

    if(config.styles && ( config.styles.state === 'develop' || ( config.images && config.images.state === 'develop' ))) {
        var entry = config.styles.entry;

        if(entry) {
            entry = entry.split('/');
            entry = entry[entry.length - 1];

            entry = entry.slice(0, entry.lastIndexOf('.')) + '.min.css';
        }

        config.styles.state = 'production'; 
        cssSources.push(cssBaseUrl + ( entry || 'app.min.css' ));
    }

    gulp.src(cssSources, { base: cssBaseUrl })
      .pipe(fash())
      .pipe(gulp.dest(cssBaseUrl))
      .pipe(fash.manifest({
            path: './assets/production/manifest.json',
            merge: true
       }))
      .pipe(gulp.dest('./'))
      .on('end', function () {
        cb();
      });      
});

/*
 * 生成图片hash号
 */
gulp.task('hash-images', function(cb) {
    var imgBaseUrl = './assets/production/images/',
        imgSources = [];

    if(config.images && config.images.state === 'develop') {
        config.images.state = 'production';      
        imgSources.push(imgBaseUrl + '/**/*');     
    }

    gulp.src(imgSources, {base: imgBaseUrl})
      .pipe(fash())
      .pipe(gulp.dest(imgBaseUrl))
      .pipe(fash.manifest({
            path: './assets/production/manifest.json',
            merge: true
       }))                
      .pipe(gulp.dest('./'))
      .on('end', function () {
        cb();
      }); 
});

/*
 * 清理生成区
 */
gulp.task('clear-production', function(cb) {
    let promiseAll = [];

    if(config.styles && config.styles.state === 'develop') {
        promiseAll.push(del('./assets/production/styles/**/*'));
    }

    if(config.scripts && config.scripts.state === 'develop') {
        promiseAll.push(del('./assets/production/scripts/**/*'));
    }

    if(config.images && config.images.state === 'develop') {
        promiseAll.push(del('./assets/production/images/**/*'));           
    }
    
    Promise.all(promiseAll).then(function () {
        cb();
    });
});

/*
 * 同步hash值至样式表和html
 */
gulp.task('sync-libs-pro', function (cb) {
    var dest = assets + '/' + production;

    return gulp.src('static/libs/**/**')
               .pipe(gulp.dest(dest + '/libs'));   
});

/*
 * 同步hash值至样式表和html
 */
gulp.task('sync-hash', function(cb) {
    var manifest = gulptool.readManifest();
    var promiseArr = [];

    gulp.src(['./assets/production/styles/**/*.css'])
        .pipe(filter(function(vinyl) {
            var contents = vinyl.contents.toString();

            for(var origin in manifest) {
                var originReg = origin.split('.');

                originReg[0] = originReg[0] + '-\\w*';
                originReg = originReg.join('.');

                contents = contents.replace(new RegExp(originReg, 'g'), manifest[origin]);
            }

            var defer = Promise.defer();

            fs.writeFile(vinyl.path, contents, {}, function() {
                defer.resolve();
            });

            promiseArr.push(defer);
            
            return true;
        }));

    gulp.src(['./assets/production/scripts/**/*.js'])
        .pipe(filter(function(vinyl) {
            var contents = vinyl.contents.toString();
            
            for(var origin in manifest) {
                var originReg = origin.split('.');

                originReg[0] = originReg[0] + '-\\w*';
                originReg = originReg.join('.');

                contents = contents.replace(new RegExp(originReg, 'g'), manifest[origin]);
            }

            var defer = Promise.defer();

            fs.writeFile(vinyl.path, contents, {}, function() {
                defer.resolve();
            });

            promiseArr.push(defer);

            return true;
        }));

    gulp.src(['./views/**/*.html'])
        .pipe(filter(function(vinyl) {
            var contents = vinyl.contents.toString();
            
            for(var origin in manifest) {
                var originReg = origin.split('.');

                originReg[0] = originReg[0] + '-\\w*';
                originReg = originReg.join('.');

                contents = contents.replace(new RegExp(originReg, 'g'), manifest[origin]);
            }

            var defer = Promise.defer();

            fs.writeFile(vinyl.path, contents, {}, function() {
                defer.resolve();
            });

            promiseArr.push(defer);

            return true;
        }));        

    Promise.all(promiseArr).then(function() {
        cb();
    })
});

/*
 * 同步模块
 */
gulp.task('sync-config', function(cb) { 
    gulptool.writeConfig(config, function() {
        cb();
    });
});

/*
 * 构建
 */
gulp.task('build', function (cb) {
    runSequence('build-dev', 
                'clear-production',
                'sync-libs-pro',
                ['compress-styles', 'compress-scripts'], 
                'hash-styles', 
                'hash-scripts', 
                'hash-images',
                'sync-hash',
                'sync-config',
                cb);
});