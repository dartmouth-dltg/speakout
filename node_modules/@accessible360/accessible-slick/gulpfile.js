var gulp = require('gulp');
var uglifyJS = require('gulp-uglify');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-clean-css');
var del = require('del');

// Remove old files
gulp.task('clean', function() {
  return del(['slick/*.min.*']);
});

// Build the CSS
gulp.task('build:css', function() {
  return gulp.src(['slick/*.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest('slick'));
});

// Build the JavaScript
gulp.task('build:js', function() {
  return gulp.src(['slick/slick.js'])
    .pipe(uglifyJS())
    .pipe(rename('slick.min.js'))
    .pipe(gulp.dest('slick'));
});

// Watch source files for changes and automatically rebuild them when change are saved
gulp.task('watch', function() {
  gulp.watch('slick/*.scss', gulp.series(['build:css']));
  gulp.watch(['slick/*.js', '!slick/*.min.js'], gulp.series(['build:js']));
});

// Default task executes a fresh build of custom JS
gulp.task('default', gulp.series('clean','build:js','build:css'));