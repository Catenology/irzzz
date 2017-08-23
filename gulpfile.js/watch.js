const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('watch', ['styles'], () => {
  browserSync.init({
    server: './dist',
  });
  gulp.watch('src/**/*.+(scss|js|md|html)', ['build']);
  gulp.watch('dist').on('change', browserSync.reload);
});
