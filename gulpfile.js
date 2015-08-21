var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');

gulp.task('styles', function () {
    gulp.src('www/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./www/styles'));
});

gulp.task('default',function () {
  gulp.watch('www/**/*.scss',['start-clean']);
});

gulp.task('start-clean', function (cb) {
  del('www/**/*.css', cb);
});

gulp.task('clean', function () {
  gulp.start('start-clean');
});
