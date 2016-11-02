import gulp from 'gulp';

import qniu from 'gulp-qniu';

import uglify from 'gulp-uglify';
import gulptool from './tool.babel';

import runSequence from 'run-sequence';

import fs from 'fs';

var config = gulptool.readConfig();

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
gulp.task('sync-config-states', function(cb) { 

    if(config.scripts) {
        config.scripts.state = 'published';
    }

    if(config.styles) {
        config.styles.state = 'published';
    }

    if(config.images) {
        config.images.state = 'published';
    }

    gulptool.writeConfig(config, function() {
        cb();
    });
});


/*
 * @description 发布静态资源至CDN
 */
gulp.task('publish', function (cb) {
    runSequence('build', ['publish-scripts', 'publish-styles', 'publish-font-img', 'publish-libs'], 'sync-config-states', cb);
});
