import gulp from 'gulp';
import mocha from 'gulp-mocha';
import eslint from 'gulp-eslint';       

/*
 * @description 脚本格式校验
 */
gulp.task('eslint', function () {
  return gulp.src('./static/views/**/**/*.js')
             .pipe(eslint())
             .pipe(eslint.format());    
});

/*
 * @description 测试
 */
gulp.task('mocha', function () {
    
});