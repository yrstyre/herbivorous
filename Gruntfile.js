module.exports = function(grunt) {

    // 1. All configuration goes here 
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        jshint: {
          files: ['Gruntfile.js', 'scripts/viewmodels/*.js', '!scripts/libs/**'],
            options: {
              globals: {
                jQuery: true
              }
            }
        },
        watch: {
          scripts: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
          },
          css: {
            files: ['scss/*.scss'],
            tasks: ['sass'],
            options: {
                spawn: false
            }
          }
        },
        sass: {
          dist: {
            options: {
                style: 'compressed'
            },
            files: {
                'css/style.css': 'scss/style.scss'
            }
        } 
        }
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask('default', ['watch']);

};