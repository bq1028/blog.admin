import gulp from 'gulp';

import qniu from 'gulp-qniu';

import uglify from 'gulp-uglify';
import gulptool from './tool.babel';

import runSequence from 'run-sequence';

import fs from 'fs';

var modules = JSON.parse(fs.readFileSync('./modules.json'));

const source = 'static',
      assets = 'assets',
      develop = 'develop',
      production = 'production';

const qiniu_options = {
    accessKey: 'KcH25vxJ8THYo9ExNp_-Kobr-TebdAZLss-JuLvD',
    secretKey: 'y82r6nTrPeQpjs5UXRdHlwePZh_9nFKIS-6gJFEn',
    bucket: 'static',
    domain: 'ocgkyeaew.bkt.clouddn.com'
};


/*
 * @description 发布脚本
 */
gulp.task('publish-scripts', function () {
    return gulp.src(['./assets/production/scripts/**/*'])
                .pipe(qniu({
                    qiniu: qiniu_options,
                    baseDir: 'production'
                }));
});

/*
 * @description 发布文字和图片
 */
gulp.task('publish-font-img', function () {
    return gulp.src(['./assets/production/images/**/**/*', './assets/production/font/**/**/*'])
                .pipe(qniu({
                    qiniu: qiniu_options,
                    baseDir: 'production'
                }));
});

/*
 * @description 发布样式
 */
gulp.task('publish-styles', function () {
    return gulp.src(['./assets/production/styles/**/*'])
                .pipe(qniu({
                    qiniu: qiniu_options,
                    baseDir: 'production'
                }));
});

/*
 * @description 发布样式
 */
gulp.task('publish-libs', function () {
    return gulp.src(['./assets/production/libs/**/**/**/*'])
                .pipe(qniu({
                    qiniu: qiniu_options,
                    baseDir: 'production'
                }));
});

/*
 * @description 同步模块
 */
gulp.task('sync-modules-states', function(cb) { 

    modules.forEach(function (module) {
        if(module.config.scripts) {
            module.config.scripts.state = 'published';
        }

        if(module.config.styles) {
            module.config.styles.state = 'published';
        }

        if(module.config.images) {
            module.config.images.state = 'published';
        }                
    });

    gulptool.writeModulesConfig(modules, function() {
        cb();
    });
});


/*
 * @description 发布静态资源至CDN
 */
gulp.task('publish', function (cb) {
    runSequence('build', ['publish-scripts', 'publish-styles', 'publish-font-img', 'publish-libs'], 'sync-modules-states', cb);
});
