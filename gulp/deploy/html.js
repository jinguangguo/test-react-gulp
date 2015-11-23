/**
 * @file
 * @author jinguangguo
 * @date 2015/11/22
 */

var gulp = require('gulp');

var replace = require('gulp-replace');

gulp.task('html', function() {
    "use strict";
    // FIXME 更加精准的匹配正则
    return gulp.src(global.APP_PATH.PAGE +  '/**')
        .pipe(replace(/\.scss/g, '.css'))
        .pipe(replace(/\.jsx/g, '.js'))
        .pipe(gulp.dest(global.OUTPUT_PATH.PAGE));
});
