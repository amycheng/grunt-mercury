/*global module:false*/



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
            server: {
                options: {
                    port: 9001,
                    base: target
                }
            }
        },
        copy: {
            images: {
                files: [
                    {
                    expand: true,
                     cwd: ['_dev/images/'],
                     src: '*',
                      dest: 'site/images/'} // includes files in path and its subdirs
                ]
            }
        },
        watch: {
            options: {
                livereload: true,
                nospawn: false
            },
            css: {
                files: [dev_css+'/*'],
                tasks: ['sass:dev']
            },
            js: {
                files: [dev_js+'/*'],
                tasks: ['concat:javascript']
            },
            images: {
                files:[dev_img+'/*'],
                tasks: ['copy:images']
            },
            html: {
                files: [dev_html+'/**/*.hbs'],
                tasks: ['assemble:html']
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
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('dev', ['assemble','sass','concat','connect', 'watch']);
};
