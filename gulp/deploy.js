/**
 * @file
 * @author jinguangguo
 * @date 2015/11/22
 */

var gulp = require('gulp');

var sequence = require('gulp-sequence');

// 定义全局变量

global.APP_PATH = {
    PAGE: './app/page',
    STATIC: './app/static',
    TEST: './app/test',
    WIDGET: './app/widget',
    BOWER: './bower_components'
};

global.OUTPUT_PATH = {
    BASE: './output',
    PAGE: './output/app/page',
    STATIC: './output/app/static',
    TEST: './output/app/test',
    WIDGET: './output/app/widget',
    BOWER: './output/bower_components'
};

require('./deploy/clean');

require('./deploy/html');

require('./deploy/react');

require('./deploy/scss');

require('./deploy/static');

require('./deploy/bower');

// 1. run 'clean'
// 2. run 'html', 'react', 'scss', 'static' in parallel;
gulp.task('deploy', sequence('clean', ['html', 'react', 'scss', 'static', 'bower']));



