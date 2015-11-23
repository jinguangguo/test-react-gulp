/**
 * @file
 * @author jinguangguo
 * @date 2015/11/23
 */

var gulp = require('gulp');

var clean = require('gulp-clean');

gulp.task('clean', function() {
    "use strict";
    return gulp.src(global.OUTPUT_PATH.BASE, {read: false})
        .pipe(clean());
});