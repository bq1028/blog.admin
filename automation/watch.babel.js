import gulp from 'gulp';

import less from 'gulp-less';
import watch from 'gulp-watch';
import webpack from 'webpack';

import gulptool from './tool.babel';
import webpackConfig from './webpack.config.babel';
import plumber from 'gulp-plumber';
import amdOptimize from 'amd-optimize';

import fs from 'fs';

var modules = gulptool.readModulesConfig();
var modules_len = modules.length;

const source = 'static',
      assets = 'assets',
      develop = 'develop',
      production = 'production';


/*
 * @description 观察view文件
 */
gulp.task('watch-scripts', function () {
    watch('static/scripts/**/**/**/**', {}, function(vinyl) {
        var entry, output, _modules = [];
        var path = vinyl.path;

        var scripts_idx = path.indexOf('scripts');

        for(var i = 0; i < modules_len; i ++) {
            var module_idx = path.indexOf(modules[i].name);
            
            if( module_idx !== - 1 && module_idx > scripts_idx) { 
                _modules.push(modules[i]);
            } else {
                if(modules[i].config.scripts) {
                    var dependencies = modules[i].config.scripts.dependencies;

                    if(dependencies) {
                        var deps_len = dependencies.length;

                        for(var j = 0; j < deps_len; j ++ ) {
                            var dep = dependencies[j];
                            var dep_idx = path.indexOf(dep);

                            if(dep_idx !== -1 && dep_idx > scripts_idx) {
                                _modules.push(modules[i]);
                            }
                        }
                    }
                }
            }
        }

        var _modules_len = _modules.length

        for(var i = 0; i < _modules_len; i ++) {
            var module = _modules[i];

            if(module.config.scripts) {
                if(!module.config.scripts.ng) {
                    if(module.config.scripts.entry) {
                        entry = module.config.scripts.entry;
                    } else {
                        entry = './static/scripts/' + module.name + '/app.js';
                    }

                    if(module.config.scripts.output) {
                        output = module.config.scripts.output;
                    } else {
                        output = './assets/develop/scripts/' + module.name;
                    }

                    var arr = entry.split('/');
                    var filename = arr[arr.length - 1].split('.');

                    filename[1] = 'js';
                    filename = filename.join('.');
                    
                    var config = webpackConfig.get(entry, output, filename);

                    webpack(config, function (err, stats) {
                        if(err) {
                            console.log('!!!!ERROR: ' + error);
                        } else {
                            module.config.scripts.state = 'develop';
                            gulptool.writeModulesConfig(modules);
                        }
                    });
                } else {
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
                    
                    gulp.src(src)
                       .pipe(plumber())
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
                }
            }
        }
    });
});

/*
 * @description 观察样式文件
 */
gulp.task('watch-styles', function () {
    watch('static/styles/**/**/**', {}, function(vinyl) {
        var entry, output, _modules = [];
        var path = vinyl.path;

        var styles_idx = path.indexOf('styles');

        for(var i = 0; i < modules_len; i ++) {
            var module_idx = path.indexOf(modules[i].name);

            if(module_idx !== - 1 && module_idx > styles_idx){ 
                _modules.push(modules[i]);
            } else {
                if(modules[i].config.styles) {
                    var dependencies = modules[i].config.styles.dependencies;

                    if(dependencies) {
                        var deps_len = dependencies.length;

                        for(var j = 0; j < deps_len; j ++ ) {
                            var dep = dependencies[j];
                            var dep_idx = path.indexOf(dep);

                            if(dep_idx !== -1 && dep_idx > styles_idx) {
                                _modules.push(modules[i]);
                            }
                        }
                    }
                }
            }
        }
        
        var _modules_len = _modules.length
        var module_name = '';

        for(var i = 0; i < _modules_len; i ++) {
            var module = _modules[i];

            if(module.config.styles) {
                // 获取入口
                if(module.config.styles.entry) {
                    entry = module.config.styles.entry;
                } else {
                    entry = './static/styles/modules/' + module.name + '/app.less';
                }

                // 获取输入路径
                if(module.config.styles.output) {
                    output = module.config.styles.output;
                } else {
                    output = './assets/develop/styles/' + module.name;
                }

                module_name = module.name;
            } else {
                continue;
            }

            var arr = entry.split('/');
            var filename = arr[arr.length - 1].split('.');

            filename[1] = 'css';
            filename = filename.join('.');
            
            gulp.src(entry) 
                .pipe(less())
                .pipe(gulp.dest(output))
                .on('end', function() {
                    module.config.styles.state = 'develop';
                    gulptool.writeModulesConfig(modules);
                }); 
        }
    });
});

/*
 * @description 观察图片文件
 */
gulp.task('watch-images', function () {
    var dest = assets + '/' + develop  + '/images';
    var source = 'static/images/**/**';

    gulp.src(source)
        .pipe(gulp.dest(dest))
        .pipe(watch(source, function(vinyl) {
            var path = vinyl.path;
            var images_idx = path.indexOf('images');
            var module = null;

            for(var i = 0; i < modules_len; i ++) {
                var _module = modules[i];
                var module_idx = path.indexOf(_module.name);

                if(module_idx !== -1 && module_idx > images_idx) { 
                    module = _module;
                }
            }

            if(module) {
                module.config.images.state = 'develop';
                gulptool.writeModulesConfig(modules);
            }
        }))
        .pipe(gulptool.filterAdd_Del)
        .pipe(gulp.dest(dest));
});

/*
 * @description 观察图片文件
 */
gulp.task('watch-libs', function () {
    var dest = assets + '/' + develop  + '/libs';

    gulp.src('static/libs/**/**/**')
        .pipe(gulp.dest(dest))
        .pipe(watch('static/libs/**/**/**'))
        .pipe(gulp.dest(dest));
});


/*
 * @description 观察
 */
gulp.task('watch', function () {
    gulp.run('build-dev');
    gulp.run('watch-images', 'watch-scripts', 'watch-styles');
});