(function(){
"use strict";

module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["dist", "example", 'docs'],
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
        autoprefixer: {
            options: {
                browsers: ['last 3 versions', 'bb 10', 'android 3']
            },
            your_target: {
                src: "dist/<%= pkg.name %>.css"
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
        },
        ngdocs: {
            options: {
                dest: 'docs',
                html5Mode: false,
                startPage: 'docs'
            },
            imxColorPicker: {
                api: true,
                src: ['src/js/*.js', 'src/js/**/*.js'],
                title: 'IMX ColorPicker Documentation'
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-ngdocs');

    grunt.registerTask('test', ['jshint']);

    grunt.registerTask('default', ['jshint', 'clean', 'concat', 'less', 'autoprefixer', 'copy', 'ngdocs']);

};
}());