(function(){
"use strict";

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["dist", "example"],
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
                    //Copy partials
                    {expand: true, flatten: true, src: ['src/template/partials/*'], dest: 'dist/', filter: 'isFile'},
                    //Build example
                    {expand: true, flatten: true, src: ['src/template/example.html'], dest: 'example/', filter: 'isFile'},
                    {expand: true, cwd: 'bower_components/', src: ['**'], dest: 'example/js/'},
                    {expand: true, flatten: true, src: ['dist/*', 'src/template/partials/*'], dest: 'example/js/imx-color-picker/', filter: 'isFile'}
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('default', ['jshint', 'clean', 'concat', 'less', 'copy']);

};
}());