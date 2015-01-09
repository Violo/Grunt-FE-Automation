module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // Uglify Task
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        //src: 'app/<%= pkg.name %>.js',
        //src: 'app/*.js',
        //dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    // ReadMe Task
    readme: {
      
    },
    // Compass Task
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      }
    },
    // CSSlint Task
    csslint: {
      strict: {
        options: {
          csslintrc: '.csslintrc'
        },
        src: ['css/*.css']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin grunt-readme
  grunt.loadNpmTasks('grunt-readme');
  // Load the plugin compass
  grunt.loadNpmTasks('grunt-contrib-compass');
  // Load the plugin CSSlint
  grunt.loadNpmTasks('grunt-contrib-csslint');

  // Default task(s).
  grunt.registerTask('default', ['readme', 'uglify', 'compass', 'csslint:strict']);


};