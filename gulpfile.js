var gulp       = require('gulp'),
    argv       = require('yargs').argv,
    coffee     = require('gulp-coffee'),
    sourcemaps = require('gulp-sourcemaps'),
    concat     = require('gulp-concat'),
    rename     = require('gulp-rename'),
    uglify     = require('gulp-uglify'),
    gutil      = require('gulp-util'),
    gulpif     = require('gulp-if');

var prodFiles = ['src/app.coffee', 'src/handwritten/*.coffee'];
var devFiles  = prodFiles.concat(['src/dev/dev.coffee']);

var compile = function(){
  gulp.src(argv.production ? prodFiles : devFiles)
    .pipe(sourcemaps.init())
    .pipe(coffee({bare: true}).on('error', gutil.log))
    .pipe(concat('handwritten.dev.js'))
    .pipe(sourcemaps.write())
    .pipe(gulpif(argv.production, rename('handwritten.min.js')))
    .pipe(gulpif(argv.production, uglify()))
    .pipe(gulp.dest('.'));
}

gulp.task('build', compile(prodFiles));

gulp.task('watch', function(){
  gulp.watch('src/**/*.coffee', ['build'])
});

gulp.task('default', ['build', 'watch']);
