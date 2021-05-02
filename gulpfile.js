const { parallel, watch } = require("gulp");
const gulp = require('gulp');
const purgecss = require('gulp-purgecss');


const sass = require("./gulp-tasks/sass.js");

const watcher = () => {
  watch("./src/_assets/scss/**/*.scss", { ignoreInitial: true }, sass);
};

exports.default = parallel(sass);

exports.watch = watcher;

gulp.task('goron', function () {

  return gulp.src('./src/_includes/css/tokens.css')
    .pipe(purgecss({
      content: [
        './src/**/*.html'
      ],
      defaultExtractor: content => content.match(/[A-Za-z0-9-:/]+/g) || []
    }))
    .pipe(gulp.dest('./dist/_includes/css/'));
});

gulp.task('build', gulp.parallel(
  'goron'
));