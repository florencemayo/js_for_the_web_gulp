const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');

gulp.task('copyFiles', () => {
  

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


gulp.task('lintJS', () => {
  return new Promise(function(resolve, reject) {
    gulp.src('*.js')
	    .pipe(jshint({
	        esversion: 8
	    }))
	    .pipe(jshint.reporter('default'))
		.pipe(gulp.dest('dist'));

    resolve();
    });
});


gulp.task('minifyOldJS', () => {
  return new Promise(function(resolve, reject) {
    gulp.src('*.babel.js')
	    .pipe(uglify())
	    .pipe(gulp.dest('dist'));

    resolve();
    });
});


gulp.task('minifyCurrentJS', () => {
  return new Promise(function(resolve, reject) {
    gulp.src(['blog.js','functions.js'])
	    .pipe(uglify())
	    .pipe(gulp.dest('dist'));

    resolve();
    });
});


gulp.task('transpileJS', () => {
  return new Promise(function(resolve, reject) {
    gulp.src('*.js')
        .pipe(babel({
            presets: ['env']
        }))
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


gulp.task('watch', () => {
  gulp.watch('*.js', ['lintJS', 'transpileJS']);
  gulp.watch('*.babel.js', ['minifyOldJS']);
  gulp.watch(['blog.js','functions.js'], ['minifyCurrentJS']);
  gulp.watch(['*.html',
	  	'*.json',
	  	'README.md',
	  	'.gitignore',
	  	'./*node_modules/**/*',
	  	'./*images/**/*'], ['copyFiles']);
});


gulp.task('default', (callback) => {
  runSequence(['copyFiles', 'lintJS', 'minifyOldJS', 'minifyCurrentJS', 'transpileJS', 'babelPolyfill', 'watch'], callback);
});

