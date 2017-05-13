const gulp = require('gulp');
const exec = require('child_process').exec;

gulp.task('build', ['scripts','iconfont'], (cb) => {
  exec(['jekyll b --source src --destination dist'], (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});
