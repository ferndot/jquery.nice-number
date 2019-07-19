var gulp = require('gulp');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var uglifycss = require('gulp-uglifycss');
var pump = require('pump');

gulp.task('default', function (cb) {
  pump(
    [
      gulp.src('src/**/*.js'),
      uglify(),
      gulp.dest('dist'),

      gulp.src('src/**/*.css'),
      uglifycss({
        "maxLineLen": 80,
        "uglyComments": true
      }),
      rename(function (path) {
        path.basename += ".min";
      }),
      gulp.dest('dist'),

      gulp.src('src/**/*'),
      gulp.dest('dist'),
    ],
    cb
  );
});
