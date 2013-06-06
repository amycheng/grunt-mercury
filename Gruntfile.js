/*global module:false*/

//for livereload
'use strict';
var path = require('path');
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;

var folderMount = function folderMount(connect, point) {
    return connect.static(path.resolve(point));
};
//

module.exports = function(grunt) {
    //CUSTOMIZE OR ADD VARIABLES TO HAVE GRUNT LOOK AT THE CORRECT ASSETS
    var
    dev_css = '_dev/css',
    dev_js = '_dev/js',
    dev_img = '_dev/images',
    dev_html= '_dev/html',
    target_css = 'site/css',
    target_js = 'site/js',
    target_img = 'site/images',
    target='site';

    grunt.initConfig({
        assemble: { //precompiles HTML from Handlebars Templates
            html: {
                options: {
                    engine: 'handlebars',
                    partials: dev_html+'/*.hbs',
                    data: dev_html+'_/data/data.json'
                },
                files: {
                    'site/index.html' : dev_html+'/index.hbs'
                }
            }
        },
        concat: {
            javascript: {
                src:[],
                dest: target_js+'/script.js'
            } 
        },
        connect: {
            livereload: {
                options: {
                    port: 9001,
                    base: target,
                    middleware: function(connect, options) {
                        return [lrSnippet, folderMount(connect, options.base)];
                    }
                }
            }
        },
        copy: {
            images: {
                files: [
                    {expand: true, src: ['_dev/images/**'], dest: 'site/images/'} // includes files in path and its subdirs
                ]
            }
        },
        regarde: {
            css: {
                files: [dev_css+'/*'],
                tasks: ['sass:dev','livereload']
            },
            js: {
                files: [dev_js+'/*'],
                tasks: ['concat:javascript','livereload']
            },
            images: {
                files:[dev_img+'/*'],
                tasks: ['copy:images','livereload']
            },
            html: {
                files: [dev_html+'/**/*.html'],
                tasks: ['assemble:html','livereload']
            }
        },
        sass: { //compile CSS from SASS                              
            dev: {                             
                options: {                      
                    style: 'expanded',
                    noCache: false,
                    lineNumbers: false,
                    compass: true
                },
                files: {
                    'site/css/style.css': [
                        dev_css+'/*.scss'
                    ]
                }
            }
        }    

    });

    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('dev', ['assemble','sass','concat','livereload-start','connect', 'regarde']);
};
