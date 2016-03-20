var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');

var paths = {
	frontend:{
		sass: {
			src: './assets/scss/**/*.scss',
			dest: './assets/css'
		},
		js: {
			src: ['./assets/js/**/*.js', '!./assets/js/app.min.js', '!./assets/js/libraries/**/*.js'],
			dest: './assets/js/',
			filename:'app.min.js'
		}
	}
};

gulp.task('scripts', function() {
	console.log('Concatenating Scripts');
	return gulp.src(paths.frontend.js.src)
		.pipe(sourcemaps.init())
		.pipe(concat(paths.frontend.js.filename))
		.pipe(uglify().on('error',handleError))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.frontend.js.dest));
});

gulp.task('styles', function(){
	console.log('Compiling Sass');
	gulp.src(paths.frontend.sass.src)
		.pipe(sourcemaps.init())
		.pipe(sass({outputStyle: 'expanded'}).on('error',handleError))
		.pipe(sourcemaps.write())
		.pipe(prefix("last 2 versions", "> 1%", "ie 8", "ie 7"))
		.pipe(gulp.dest(paths.frontend.sass.dest));
});

gulp.task('default', ['styles', 'scripts'], function(){
	gulp.watch(paths.frontend.sass.src, ['styles']);
	gulp.watch(paths.frontend.js.src, ['scripts']);
});

function handleError(error){
	console.log(error.toString());
	this.emit('end');
}
