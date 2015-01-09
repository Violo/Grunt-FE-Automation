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
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin grunt-readme
  grunt.loadNpmTasks('grunt-readme');
  // Load the plugin compass
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task(s).
  grunt.registerTask('default', ['uglify', 'readme', 'compass']);


};