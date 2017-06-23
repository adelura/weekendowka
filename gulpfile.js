var gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    connect = require('gulp-connect'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('default',['html', 'js', 'imagemin', 'styles', 'startServer', 'watch']);

gulp.task('html', function() {
    return gulp.src('./src/public/*.*')
    .pipe(gulp.dest('./build'));
});

gulp.task('js', function() {
    return browserify({
        entries: ['./src/js/index.js']
    })
    .transform(babelify.configure({
        presets : ['es2015']
    }))
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build'))
    ;
});

gulp.task('styles', function() {
    gulp.src('./src/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/styles'));
});

gulp.task('imagemin', () =>
	gulp.src('./src/images/*')
		.pipe(imagemin())
		.pipe(gulp.dest('./build/images'))
);

gulp.task('startServer', function() {
    connect.server({
        root : './build',
        livereload : true,
        port : 8080
    });
});

gulp.task('watch',function() {
    gulp.watch('./src/styles/**/*.scss',['styles']);
    gulp.watch('./src/js/index.js', ['js']);
    gulp.watch('./src/public/*.*', ['html']);
    gulp.watch('./src/images/**/*', ['imagemin']);
});
