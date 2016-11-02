import gulp from 'gulp';

import less from 'gulp-less';
import watch from 'gulp-watch';
import webpack from 'webpack';

import gulptool from './tool.babel';
import plumber from 'gulp-plumber';
import amdOptimize from 'amd-optimize';

import fs from 'fs';

var config = gulptool.readConfig();

const source = 'static',
      assets = 'assets',
      develop = 'develop',
      production = 'production';


/*
 * @description 观察view文件
 */
gulp.task('watch-scripts', function () {
    watch('static/scripts/**/**/**/**', {}, function(vinyl) {
        gulp.run('compile-scripts');

        config.scripts.state = 'develop';
        gulptool.writeConfig(config);        
    });
});

/*
 * @description 观察样式文件
 */
gulp.task('watch-styles', function () {
    watch('static/styles/**/**/**', {}, function(vinyl) {
        gulp.run('compile-styles');

        config.styles.state = 'develop';
        gulptool.writeConfig(config);        
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
        .pipe(watch(source, function() {
            config.images.state = 'develop';
            gulptool.writeConfig(config);
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