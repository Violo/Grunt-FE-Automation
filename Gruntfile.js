module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // ReadMe Task
    readme: {
      
    },
    // Uglify Task
    uglify: {
      build: {
        src: 'js/app.js',
        dest: 'js/app.min.js'
      }
    },
    // minifyHtml Task
    minifyHtml: {
      options: {
          cdata: true
      },
      dist: {
          files: {
              'index.html': ['index_template.html']
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
    },
    // Grunt SVG Min Task
    svgmin: {
        dist: {
            files: [{
                expand: true,
                cwd: 'img',
                src: ['*.svg'],
                dest: 'img'
            }]
        }
    },
    // Grunt Icon Task
    grunticon: {
      myIcons: {
        files: [{
          expand: true,
          cwd: 'img',
          src: ['*.svg', '*.png'],
          dest: "img/grunticon-assets"
        }],
        options: {
          previewhtml: "img_assets_preview.html",
          pngfolder: "../png-fallback",
          pngpath: "../png-fallback",
          previewTemplate: "img/grunticon-assets/preview.hbs",
          defaultWidth: "64px",
          defaultHeight: "64px"
        }
      }
    },
    // Compass Task
    compass: {
      dist: {
        options: {
          config: 'config.rb'
        }
      },
      dev: {
        options: {
          config: 'config.rb',
          watch: true
        }
      }
    }
  });

  // Load the plugin grunt-readme
  grunt.loadNpmTasks('grunt-readme');
  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin minify-html
  grunt.loadNpmTasks('grunt-minify-html');
  // Load the plugin CSSlint
  grunt.loadNpmTasks('grunt-contrib-csslint');
  // Load the plugin SVGMin
  grunt.loadNpmTasks('grunt-svgmin');
  // Load the plugin Grunt Icon
  grunt.loadNpmTasks('grunt-grunticon');
  // Load the plugin compass
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task.
  grunt.registerTask('default', ['readme', 'uglify', 'minifyHtml', 'csslint:strict', 'svgmin', 'grunticon', 'compass:dist']);
  // Prod task.
  grunt.registerTask('dev', ['svgmin', 'grunticon', 'csslint:strict', 'compass:dev']);


};