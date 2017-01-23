import gulp from 'gulp';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';       
import plumber from 'gulp-plumber';

/*
 * 脚本格式校验
 */
gulp.task('eslint', function () {
  return gulp.src('./static/views/**/**/*.js')
             .pipe(plumber())
             .pipe(eslint())
             .pipe(eslint.format());    
});

/*
 * 测试
 */
gulp.task('mocha', function () {
    
});