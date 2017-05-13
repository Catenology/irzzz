'use strict';

const gulp = require('gulp');
const util = require('gulp-util');
const ftp = require('vinyl-ftp');
const minimist = require('minimist');

const args = minimist(process.argv.slice(2));
const conn = ftp.create({
  host: args.host,
  user: args.user,
  password: args.password,
  log: util.log,
});
const remotepath = 'site/wwwroot';

gulp.task('cleanremote', (cb) => {
    return conn.rmdir(remotepath, function(err) {
        cb();
    });
});

gulp.task('deploy',['cleanremote'], () => {
    const globs = ['./dist/**/*.*'];
    return gulp.src(globs, {buffer: false})
    .pipe(conn.dest(remotepath));
});
