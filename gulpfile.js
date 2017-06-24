let gulp = require('gulp'),
    babelify = require('babelify'),
    browserify = require('browserify'),
    connect = require('gulp-connect'),
    source = require('vinyl-source-stream'),
    sass = require('gulp-sass'),
    imagemin = require('gulp-imagemin'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('build',['html', 'js', 'imagemin', 'styles']);
gulp.task('default',['build', 'startServer', 'watch']);

gulp.task('html', function() {
    return gulp.src('./public/*.*')
    .pipe(gulp.dest('./build'));
});

gulp.task('js', function() {
    return browserify({
        entries: ['./public/app.js']
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
    gulp.src('./public/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./build/styles'));
});

gulp.task('imagemin', () =>
	gulp.src('./public/images/*')
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
    gulp.watch('./public/styles/**/*.scss',['styles']);
    gulp.watch('./public/app.js', ['js']);
    gulp.watch('./public/*.*', ['html']);
    gulp.watch('./public/images/**/*', ['imagemin']);
});
