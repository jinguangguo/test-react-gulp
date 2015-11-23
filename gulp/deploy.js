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
    WIDGET: './app/widget'
};

global.OUTPUT_PATH = {
    BASE: './output',
    PAGE: './output/page',
    STATIC: './output/static',
    TEST: './output/test',
    WIDGET: './output/widget'
};

require('./deploy/clean');

require('./deploy/html');

require('./deploy/react');

require('./deploy/less');

require('./deploy/static');

// 1. run 'clean'
// 2. run 'html', 'react', 'scss', 'static' in parallel;
gulp.task('deploy', sequence('clean', ['html', 'react', 'scss', 'static']));



