/**
 * @file
 * @author jinguangguo
 * @date 2015/11/14
 */

var gulp = require('gulp');

var fs = require('fs');

var Hapi = require('hapi');

var swig = require('swig');

var browserify = require('browserify');

var nodeSass = require('node-sass');

var server = new Hapi.Server();

gulp.task('server:start', function() {
    "use strict";

    server.connection({
        port: 3000,
        host: '0.0.0.0'
    });

    function getFileInfo(requestPath) {
        var filePath = '.' + requestPath;
        var lastIndex = filePath.lastIndexOf('.');
        var directoryPath = filePath.substring(0, lastIndex);
        var fileType = filePath.substring(lastIndex + 1);
        return {
            directoryPath: directoryPath,
            filePath: filePath,
            fileType: fileType
        };
    }

    var htmlUtil = {
        _replaceScss: function(html) {
            //var reg = /(\S+)\.scss([\?\S+]?)/g;
            //html.replace(reg, '$1.css$2');
            html = html.replace(/\.scss/g, '.css');
            return html;
        },
        _replaceJsx: function(html) {
            html = html.replace(/\.jsx/g, '.js');
            return html;
        },
        /**
         * 替换scss和jsx
         * @param html
         */
        replaceResource: function(html) {
            html = this._replaceScss(html);
            html = this._replaceJsx(html);
            return html;
        }
    };

    // 静态资源 - OK
    server.route({
        method: 'GET',
        path: '/{params*}',
        handler: function(request, reply) {

            console.log('request.path ==================== ' + request.path);

            var fileInfo = getFileInfo(request.path);

            if (/bower_components/g.test(fileInfo.filePath) === true) {
                reply.file(fileInfo.filePath);
                return;
            }

            switch (fileInfo.fileType) {
                case 'css':
                    fs.exists(fileInfo.filePath, function(exists) {
                        if (exists) {
                            reply.file(fileInfo.filePath);
                        } else {
                            reply(
                                nodeSass.renderSync({
                                    file: fileInfo.directoryPath + '.scss'
                                }).css
                            ).type('text/css');
                        }
                    });
                    break;
                case 'html':
                    var template = swig.compileFile(fileInfo.filePath);
                    html = template({});
                    var html = htmlUtil.replaceResource(html);
                    reply(html).type('text/html');
                    break;
                case 'js':
                    fs.exists(fileInfo.filePath, function(exists) {
                        if (exists) {
                            reply.file(fileInfo.filePath);
                        } else {
                            browserify(fileInfo.directoryPath + '.jsx', {
                                transform: ['reactify'],
                                extensions: ['.jsx']
                            }).bundle(function(error, stream) {
                                if (error) {
                                    console.log(error);
                                }
                                reply(stream).type('text/javascript');
                            });
                        }
                    });
                    break;
                default:
                    reply.file(fileInfo.filePath);
            }

        }
    });

    server.start(function() {
        console.log('Server running at:', server.info.uri);
    });

});
