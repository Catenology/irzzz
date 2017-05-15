const gulp = require('gulp');
const prefix = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');

gulp.task('styles', ['build'], ()=>{
  gulp.src('dist/assets/main.css')
    .pipe(cleancss())
    .pipe(rename({
      basename: 'style',
      suffix: '.min',
      extname: '.css',
    }))
    .pipe(gulp.dest('dist/assets'));
});
