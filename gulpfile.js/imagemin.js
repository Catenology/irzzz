const gulp = require('gulp');
const imagemin = require('gulp-imagemin');

gulp.task('imagemin', ()=>{
  gulp.src('dist/**/*.{png,jpg,svg}')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images/'));
});
