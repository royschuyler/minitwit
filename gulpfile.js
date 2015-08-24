var gulp = require('gulp');
var sass = require('gulp-sass');
var del = require('del');

gulp.task('watch',function () {
  gulp.watch('www/**/*.scss',['clean', 'styles']);
});

gulp.task('clean', function () {
  del('www/styles/main.css');
});

gulp.task('styles', function () {
  gulp.src('www/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('./www/styles'));
});

gulp.task('default', ['styles']);
