/**
 * @file
 * @author jinguangguo
 * @date 2015/11/23
 */

var gulp = require('gulp');

gulp.task('static', function() {
    "use strict";
    return gulp.src([global.APP_PATH.STATIC + '/**',
        '!' + global.APP_PATH.STATIC + '/jsx/**',
        '!' + global.APP_PATH.STATIC + '/scss/**'], {read: true})
        .pipe(gulp.dest(global.OUTPUT_PATH.STATIC));
});