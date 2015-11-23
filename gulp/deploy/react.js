/**
 * @file
 * @author jinguangguo
 * @date 2015/11/22
 */

var gulp = require('gulp');

var react = require('gulp-react');  // 暂时不用

var browserify = require('gulp-browserify');

var rename = require('gulp-rename');

gulp.task('react', function() {
    "use strict";
    // 这里匹配所有的jsx文件(包含子文件夹)，使用**.jsx或者**/*.jsx
    // 不可以使用/**，主要是源于所有的文件路径的映射
    return gulp.src(global.APP_PATH.STATIC + '/jsx/**/*.jsx')
        .pipe(browserify({
            transform: ['reactify'],
            extensions: ['.jsx']
        }))
        .pipe(rename({
            extname: '.js'
        }))
        .pipe(gulp.dest(global.OUTPUT_PATH.STATIC + '/jsx'));
});