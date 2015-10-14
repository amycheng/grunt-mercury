/*global module:false*/



module.exports = function(grunt) {
    var
    target="",
    target_js = "js";
    target_css = "css";

    var
    dev_css = "sass";

    grunt.initConfig({
        // concat: {
        //     javascript: {
        //         src:[],
        //         dest: target_js+'/script.js'
        //     }
        // },
        connect: {
            server: {
                options: {
                    port: 9001,
                    base: target
                }
            }
        },
        watch: {
            options: {
                livereload: true
            },
            // js: {
            //     files: [target_js+'/*'],
            //     tasks: ['concat:javascript']
            // },
            css: {
                files: [dev_css+'/*'],
                tasks: ['sass:dev']
            }
        },
        sass: { //compile CSS from SASS
            dev: {
                options: {
                    style: 'expanded',
                    noCache: false,
                    lineNumbers: true,
                    compass: true
                },
                files: {
                    'css/style.css': [
                        dev_css+'/styles.scss'
                    ]
                }
            }
        }

    });

    // grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['sass','connect','watch']);
};
