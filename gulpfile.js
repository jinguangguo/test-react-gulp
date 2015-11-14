/**
 * @file
 * @author jinguangguo
 * @date 15/10/30.
 */

var gulp = require('gulp');

var Hapi = require('hapi');

var swig = require('swig');

var browserify = require('browserify');

var nodeSass = require('node-sass');

var server = new Hapi.Server();

require('./gulp/server');
