const gulp = require('gulp');
const browserify = require('browserify');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');

gulp.task('scripts', () => (browserify('src/_js/_index.js')
    .transform('babelify', {
      presets: ['env'],
    })
    .bundle()
    .pipe(source('script.js'))
    .pipe(rename({
      basename: 'script.min',
      extname: '.js',
    }))
    .pipe(gulp.dest('dist'))));
