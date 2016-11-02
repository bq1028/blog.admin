import gulp from 'gulp';

import webpack from 'webpack';
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

var modules = gulptool.readModulesConfig();

const source = 'static',
      assets = './assets',
      develop = 'develop',
      production = 'production';

/*
 * @description 编译样式
 */
gulp.task('compile-styles', function (cb) {
    var entry, 
        output,
        stream = [];

    var modulesLen = modules.length;

    for(var i = 0; i < modulesLen; i ++) {
        var module = modules[i];

        if(module.config.styles && module.config.styles.state === 'develop') {
            if(module.config.styles.entry) {
                entry = module.config.styles.entry;
            } else {
                entry = './static/styles/modules/' + module.name + '/app.less';
            }

            if(module.config.styles.output) {
                output = module.config.styles.output;
            } else {
                output = './assets/develop/styles/' + module.name;
            }

            var entryArr = entry.split('/');
            var filename = entryArr[entryArr.length - 1].split('.');

            filename[1] = 'css';
            filename = filename.join('.');

            var _stream = gulp.src(entry) 
                .pipe(less())
                .pipe(gulp.dest(output));

            stream.push(_stream);
        }
    };

    es.concat(stream).on('end', cb);
});

/*
 * @description 编译scripts
 */
gulp.task('compile-scripts', function (cb) {
    var entry, 
        output, 
        config,
        promiseArr = [];

    var modulesLen = modules.length;

    var streams = [];

    for(var i = 0; i < modulesLen; i ++) {
        var module = modules[i];

        if(module.config.scripts && module.config.scripts.state === 'develop') {
            var src = './static/scripts/' + module.name + '/**/**/**';
            var filename = 'app.js';
            var entryArr = null;

            if(module.config.scripts.entry) {
                entry = module.config.scripts.entry;

                entryArr = entry.split('/');
                filename = entryArr[entryArr.length - 1].split('.');
            }              

            if(module.config.scripts.output) {
                output = module.config.scripts.output;
            } else {
                output = './assets/develop/scripts/' + module.name;
            }

            
            var stream = gulp.src(src)
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

            streams.push(stream);
        }
    }

    var streamsDefer = q.defer();

    es.concat(streams).on('end', function () {
        streamsDefer.resolve();
    });

    promiseArr.push(streamsDefer);

    q.all(promiseArr).then(function () {
        cb();
    }, function() {
        cb('compile scripts error ...');
    });
});

/*
 * @description 同步图片
 */
gulp.task('sync-imgs', function (cb) {
    var dest = assets + '/' + develop;

    return gulp.src('static/images/**/**')
               .pipe(gulp.dest(dest + '/images'));
});

/*
 * @description 同步第三方库
 */
gulp.task('sync-libs', function (cb) {
    var dest = assets + '/' + develop;

    return gulp.src('static/libs/**/**')
               .pipe(gulp.dest(dest + '/libs'));   
});

/*
 * @description 构建dev环境
 */
gulp.task('build-dev', function (cb) {
    runSequence(['compile-styles', 'compile-scripts', 'sync-imgs', 'sync-libs'], cb);    
});


/*
 * @description 压缩样式
 */
gulp.task('compress-styles', function (cb) {

    var modulesLen = modules.length;

    var imgDest = './assets/production/images/', 
        cssDest = './assets/production/styles/';

    var stream = [];

    for(var i = 0; i < modulesLen; i ++) {
        var module = modules[i];

        if(module.config.styles  && module.config.styles.state === 'develop') {

            var styleSrc = './assets/develop/styles/' + module.name + '/*.css';
            var imgBaseUrl = './assets/develop/images/' + module.name;

            var entry = module.config.styles.entry;

            if(entry) {
                entry = entry.split('/');
                entry = entry[entry.length - 1];

                entry = entry.slice(0, entry.lastIndexOf('.')) + '.css';
            }

            var filename = entry || 'app.css';

            // 需要自动合并雪碧图的样式文件
            var spriteData = gulp.src(styleSrc)
                                 .pipe(spriter({
                                    baseUrl: '../../images/' + module.name + '/slice',
                                    spriteSheetPath: '../../images/' + module.name + '/slice',
                                    spriteSheetName: 'sprite.png'
                                 }));

            // 压缩图片
            var spriteStream = spriteData.img
                                      .pipe(imagemin())
                                      .pipe(gulp.dest(imgDest + module.name));

            // 压缩css
            var cssStream = spriteData.css
                                      .pipe(minify({
                                          advanced: false,        // 是否开启高级优化（合并选择器等）
                                          compatibility: '*',     // 启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式
                                          keepBreaks: false       // 是否保留换行          
                                      }))   
                                      .pipe(rename({suffix: '.min'}))  
                                      .pipe(gulp.dest(cssDest + module.name));

            var imgStream = gulp.src([imgBaseUrl + '/**/*', '!' + imgBaseUrl + '/slice/**/*'])
                                      .pipe(imagemin())
                                      .pipe(gulp.dest(imgDest + module.name));

            stream.push(spriteStream);
            stream.push(cssStream);
            stream.push(imgStream);
        }        
    }

    es.concat(stream).on('end', cb);
});

/*
 * @description 压缩脚本与版本号
 */
gulp.task('compress-scripts', function (cb) {
    var modulesLen = modules.length;

    var src, 
        dest,
        filename;

    var stream = [];

    for(var i = 0; i < modulesLen; i ++) {
        var module = modules[i];

        src = './assets/develop/scripts/' + module.name + '/*.js';
        dest = './assets/production/scripts/' + module.name;

        if(module.config.scripts  && module.config.scripts.state === 'develop') {
            var _stream = gulp.src(src)
                              .pipe(uglify())    
                              .pipe(rename({suffix: '.min'}))  
                              .pipe(gulp.dest(dest));  

            stream.push(_stream);
        }
    }

    es.concat(stream).on('end', cb);
});

/*
 * @description 生成脚本hash号
 */
gulp.task('hash-scripts', function (cb) { 
    var scriptBaseUrl = './assets/production/scripts/',
        scriptSources = [],
        modulesLen = modules.length;

    for(var i = 0; i < modulesLen; i ++) {
        var module = modules[i];

        if(module.config.scripts && module.config.scripts.state === 'develop') {
            var entry = module.config.scripts.entry;

            if(entry) {
                entry = entry.split('/');
                entry = entry[entry.length - 1];
                entry = entry.slice(0, entry.lastIndexOf('.')) + '.min.js';
            }

            var scriptSource = scriptBaseUrl 
                         + module.name 
                         + '/' 
                         + ( entry || 'app.min.js' );

            module.config.scripts.state = 'production';   

            scriptSources.push(scriptSource);                     
        }
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
 * @description 生成样式hash号
 */
gulp.task('hash-styles', function (cb) {
    var cssBaseUrl = './assets/production/styles/',
        cssSources = [],
        modulesLen = modules.length;

    for(var i = 0; i < modulesLen; i ++) {
        var module = modules[i];

        if(module.config.styles && ( module.config.styles.state === 'develop' || (module.config.images && module.config.images.state === 'develop'))) {
            var entry = module.config.styles.entry;

            if(entry) {
                entry = entry.split('/');
                entry = entry[entry.length - 1];

                entry = entry.slice(0, entry.lastIndexOf('.')) + '.min.css';
            }

            var cssSource = cssBaseUrl 
                          + module.name + '/' 
                          + ( entry || 'app.min.css' );


            module.config.styles.state = 'production'; 

            cssSources.push(cssSource);
        }        
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
 * @description 生成图片hash号
 */
gulp.task('hash-images', function(cb) {
    var imgBaseUrl = './assets/production/images/',
        imgSources = [],
        modulesLen = modules.length;

    for(var i = 0; i < modulesLen; i ++) {
        var module = modules[i];
        
        if(module.config.images && module.config.images.state === 'develop') {
            var imgSource = imgBaseUrl + module.name + '/**/*';
            module.config.images.state = 'production';      

            imgSources.push(imgSource);     
        }        
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
 * @description 清理生成区
 */
gulp.task('clear-production', function(cb) {
    let promiseAll = [];

    modules.forEach(function (module) {
        var moduleName = module.name;

        if(module.config.styles && module.config.styles.state === 'develop') {
            promiseAll.push(del('./assets/production/styles/' + moduleName+ '/**/*'));
        }

        if(module.config.scripts && module.config.scripts.state === 'develop') {
            promiseAll.push(del('./assets/production/scripts/' + moduleName + '/**/*'));
        }

        if(module.config.images && module.config.images.state === 'develop') {
            promiseAll.push(del('./assets/production/images/' + moduleName + '/**/*'));           
        }
    });
    


    Promise.all(promiseAll).then(function () {
        cb();
    });
});

/*
 * @description 同步hash值至样式表和html
 */
gulp.task('sync-libs-pro', function (cb) {
    var dest = assets + '/' + production;

    return gulp.src('static/libs/**/**')
               .pipe(gulp.dest(dest + '/libs'));   
});

/*
 * @description 同步hash值至样式表和html
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
 * @description 同步模块
 */
gulp.task('sync-modules', function(cb) { 
    gulptool.writeModulesConfig(modules, function() {
        cb();
    });
});

/*
 * @description 构建
 */
gulp.task('build', function (cb) {
    runSequence('build-dev', 
                'clear-production',
                'sync-libs-pro',
                ['compress-styles', 'compress-scripts'], 
                ['hash-styles', 'hash-scripts', 'hash-images'],
                'sync-hash',
                'sync-modules',
                cb);
});