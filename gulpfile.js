const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');

gulp.task('copyAllFiles', () => {
  

  return new Promise(function(resolve, reject) {
    gulp.src([
	  	'*.html',
	  	'*.json',
	  	'README.md',
	  	'.gitignore',
	  	'./*node_modules/**/*',
	  	'./*images/**/*'
  	]).pipe(gulp.dest('dist'));

    resolve();
  });
});

gulp.task('checkCodeQuality', () => {
  return new Promise(function(resolve, reject) {
    gulp.src('*.js')
	    .pipe(jshint({
	        esversion: 6
	    }))
	    .pipe(jshint.reporter('default'))
		.pipe(babel({
	      presets: ['env']
	    }))
	    .pipe(uglify())
	    .pipe(gulp.dest('dist'));

    resolve();
    });
});


gulp.task('babelPolyfill', () => {
	return new Promise(function(resolve, reject) {
	 gulp.src('./node_modules/babel-polyfill/browser.js')
	    .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
	
	resolve();
	});
 });


gulp.task('default', (callback) => {
  runSequence(['copyAllFiles', 'checkCodeQuality', 'babelPolyfill'], callback);
});

