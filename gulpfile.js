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
				maxLineLen: 80,
				uglyComments: true,
			}),
			rename(function (path) {
				path.basename += '.min';
			}),
			gulp.dest('dist'),

			gulp.src('src/**/*'),
			gulp.dest('dist'),
		],
		cb,
	);
});

var { src, dest, series, parallel } = require('gulp');
var paths = {
	src: 'src/**/*',
	js: 'src/**/*.js',
	css: 'src/**/*.css',
	dist: './dist/',
};

function addMin(path) {
	path.basename += '.min';
}

function copy() {
	return src(paths.src).pipe(dest(paths.dist));
}

copy.description =
	'Copies src folder directly to the dist folder, no mutations';

function css() {
	return src(paths.css)
		.pipe(
			uglifycss({
				maxLineLen: 80,
				uglyComments: true,
			}),
		)
		.pipe(rename(addMin))
		.pipe(dest(paths.dist));
}

css.description =
	'Mutates the css files, including minifying, and adding ".min" to the basename';

function js() {
	return src(paths.js)
		.pipe(uglify())
		.pipe(rename(addMin))
		.pipe(dest(paths.dist));
}

js.description =
	'Mutates the js files, including minifying, and adding ".min" to the basename';

exports.copy = copy;
exports.css = css;
exports.js = js;

exports.build = parallel(css, js, copy);
