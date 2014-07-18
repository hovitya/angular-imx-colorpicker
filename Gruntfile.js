(function(){
"use strict";

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/js/*.js','src/js/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/js/*.js', 'src/js/directives/*.js', 'test/**/*.js'],
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true
                }
            }
        },
        less: {
            production: {
                options: {
                    paths: ["src/less"],
                    cleancss: true,
                    modifyVars: {
                    }
                },
                files: {
                    "dist/<%= pkg.name %>.css": "src/less/style.less"
                }
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {expand: true, flatten: true, src: ['src/template/*'], dest: 'dist/', filter: 'isFile'},
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('default', ['jshint', 'concat', 'less', 'copy']);

};
}());