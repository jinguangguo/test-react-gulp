/**
 * @file
 * @author jinguangguo
 * @date 2015/11/23
 */

var gulp = require('gulp');

gulp.task('bower', function() {
    "use strict";
    return gulp.src(global.APP_PATH.BOWER + '/**', {read: true})
        .pipe(gulp.dest(global.OUTPUT_PATH.BOWER));
});