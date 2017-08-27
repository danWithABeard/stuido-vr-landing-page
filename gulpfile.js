var gulp = require('gulp');
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');

/** --- GULP LINT ---*/
gulp.task('lint', function() {
	return gulp.src('js/*.js')
	  .pipe(jshint())
	  .pipe(jshint.reporter('default'));
});

/** --- GULP SASS ---*/
gulp.task('sass', function() {
	return gulp.src('scss/*.scss')
	  .pipe(sass())
	  .pipe(cleanCSS({debug: true}, function(details) {
	  	console.log(details.name + ': ' + details.stats.originalSize);
      console.log(details.name + ': ' + details.stats.minifiedSize);
	  }))
	  .pipe(gulp.dest('docs/css'));
});

/** --- GULP SCRIPTS ---*/
gulp.task('scripts', function() {
	return gulp.src('js/*.js')
	  .pipe(concat('all.js'))
	  .pipe(rename('all.min.js'))
	  .pipe(uglify())
	  .pipe(gulp.dest('docs/js'));
});

/** --- GULP WATCH ---*/
gulp.task('watch', function() {
	gulp.watch('js/*.js', ['lint', 'scripts']);
	gulp.watch('scss/*.scss', ['sass']);
});

/** --- GULP DEFAULT ---*/
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
