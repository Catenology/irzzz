const gulp = require('gulp');
const exec = require('child_process').exec;
const del = require('del');
const replace = require('gulp-replace');
const util = require('gulp-util');
const ftp = require('vinyl-ftp');
const minimist = require('minimist');
const deployargs = minimist(process.argv.slice(2));
const conn = ftp.create({
  host: deployargs.host,
  user: deployargs.user,
  password: deployargs.password,
  log: util.log
});
var timestamp = Math.round(Date.now() / 1000);

gulp.task('default',['clean', 'build','cachebust','deploy']);

gulp.task('clean', function() {
    del(['_site']);
});

gulp.task('build', function(cb){
	exec(['jekyll b --source . --destination _site'], function(err, stdout, stderr) {
			console.log(stdout);
			console.log(stderr);
			cb(err);
	})
});

gulp.task('cachebust', function(){
  gulp.src(['_site/index.html'])
  .pipe(replace(/@@hash/g, timestamp))
  .pipe(gulp.dest('_site'));
  gulp.src(['_site/javascripts/main.js'])
  .pipe(replace(/@@hash/g, timestamp))
  .pipe(gulp.dest('_site/javascripts'));
});

//ftp deployment
gulp.task('deploy',['cleanremote'], function(){
  gulp.src('_site/**/*.*')
  .pipe(conn.dest('irzzz'));
});

gulp.task('cleanremote', function(cb) {
    return conn.rmdir('irzzz', function(err){
        cb();
    });
});
