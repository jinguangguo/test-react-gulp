/**
 * @file
 * @author jinguangguo
 * @date 2015/11/22
 */

var gulp = require('gulp');

var less = require('gulp-less');

gulp.task('less', function() {
    "use strict";
    return gulp.src([global.APP_PATH.STATIC + '/less/**/*.less',
        '!' + global.APP_PATH.STATIC + '/less/common/**/*.less'])
        .pipe(less())
        .pipe(gulp.dest(global.OUTPUT_PATH.STATIC + '/less/'));
});