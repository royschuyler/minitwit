var gulp = require('gulp');
var sass = require('gulp-sass');
var clean = require('gulp-clean');
var del = require('del');


gulp.task('default',function() {
    gulp.watch('www/**/*.scss',['start-clean']);
});

gulp.task('start-clean', function (cb) {
  del('www/**/*.css', cb);
});

gulp.task('clean', function () {
  gulp.start('start-clean');
})



