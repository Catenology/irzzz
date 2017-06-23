const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('watch', ['styles'], () => {
  browserSync.init({
    server: './dist',
  });
  gulp.watch('src/**/*.scss', ['styles']);
  gulp.watch('src/**/*.js', ['scripts']);
  gulp.watch('src/**/*.+(md|html)', ['build']);
  gulp.watch('dist').on('change', browserSync.reload);
});
