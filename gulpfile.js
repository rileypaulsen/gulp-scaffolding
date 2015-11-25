var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');

var paths = {
	frontend:{
		sass: {
			src: './assets/scss/**/*.scss',
			dest: './assets/css'
		},
		js: {
			src: ['./assets/js/**/*.js', '!./assets/js/app.js', '!./assets/js/libraries/**/*.js'],
			filename:'app.min.js'
		}
	}
};

gulp.task('scripts', function() {
	console.log('Concatenating Scripts');
	return gulp.src(paths.frontend.js.src)
		.pipe(concat(paths.frontend.js.filename))
		.pipe(uglify())
		.pipe(gulp.dest('./assets/js/'));
});

gulp.task('styles', function(){
	console.log('Compiling Sass');
	gulp.src(paths.frontend.sass.src)
		.pipe(sass({outputStyle: 'expanded'}).on('error',handleSASSError))
		.pipe(prefix("last 10 versions", "> 1%", "ie 8", "ie 7"))
		.pipe(gulp.dest(paths.frontend.sass.dest));
});

gulp.task('default', ['styles', 'scripts'], function(){
	gulp.watch(paths.frontend.sass.src, ['styles']);
	gulp.watch(paths.frontend.js.src, ['scripts']);
});

function handleSASSError(error){
	console.log(error.toString());
	this.emit('end');
}
