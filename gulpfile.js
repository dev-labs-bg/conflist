const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');

gulp.task('styles', function () {
  return gulp.src('./sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(gulp.dest('./css'))
    .pipe(notify('Styles compiled!'));
});

gulp.task('styles:watch', function () {
  gulp.watch('./sass/**/*.scss', ['styles'], function(){
      return gulp.pipe(notify('Styles compiled!'));
  });
});
