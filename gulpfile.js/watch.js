const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('watch', ['styles'], () => {
  browserSync.init({
    server: './dist',
  });
  gulp.watch('src/**/*.{md,html,yml,scss}', ['build']);
  gulp.watch('dist').on('change', browserSync.reload);
});
