var gulp = require('gulp');
var jshint = require('gulp-jshint');
var babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var pump = require('pump');

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



gulp.task('processJS', function (cb) {
  pump([
        gulp.src('*.js'),
        jshint({ esversion: 8 }),
        jshint.reporter('default'),
        babel({ presets: ['@babel/env'] }),
        uglify(),
        gulp.dest('dist')
    ],
    cb
  );
});



gulp.task('babelPolyfill', () => {
	return new Promise(function(resolve, reject) {
	 gulp.src('./node_modules/babel-polyfill/browser.js')
	    .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
	
	resolve();
	});
 });


gulp.task('watch', () => {
  gulp.watch('*.js', ['transpileJS']);
  gulp.watch('*.js', ['lintJS']);
  gulp.watch('*.js', ['minifyJS']);
  gulp.watch(['*.html',
	  	'*.json',
	  	'README.md',
	  	'.gitignore',
	  	'./*node_modules/**/*',
	  	'./*images/**/*'], ['copyFiles']);
});



gulp.task('default', gulp.series('copyFiles', 'processJS', 'babelPolyfill'));

