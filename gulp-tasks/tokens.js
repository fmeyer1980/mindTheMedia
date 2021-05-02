const gulp = require('gulp');
const purgecss = require('gulp-purgecss');

const tokens = () => {
    return gulp.src('./src/_includes/css/tokens.css')
        .pipe(purgecss({
            content: [
                './src/**/*.html'
            ],
            defaultExtractor: content => content.match(/[A-Za-z0-9-:/]+/g) || []
        }))
        .pipe(gulp.dest('./src/_includes/css/'));
};

module.exports = tokens;