const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('watch', ['build'], () => {
  browserSync.init({
    server: './dist',
  });
  gulp.watch('src/**/*.{md,html,yml}', ['build']);
  gulp.watch('dist').on('change', browserSync.reload);
});
