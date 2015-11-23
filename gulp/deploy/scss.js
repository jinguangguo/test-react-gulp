/**
 * @file
 * @author jinguangguo
 * @date 2015/11/22
 */

var gulp = require('gulp');

var sass = require('gulp-sass');

gulp.task('scss', function() {
    "use strict";
    return gulp.src([global.APP_PATH.STATIC + '/scss/**/*.scss',
        '!' + global.APP_PATH.STATIC + '/scss/common/**/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest(global.OUTPUT_PATH.STATIC + '/scss/'));
});