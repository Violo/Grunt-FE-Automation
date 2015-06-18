module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
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
    // html validation
    validation: {
      options: {
        reset: grunt.option('reset') || false,
        stoponerror: false,
        relaxerror:
          [
            'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
            'This interface to HTML5 document checking is deprecated'
          ],
        reportpath: false,
        reset: true
      },
      files: {
          src: ['*.html']
      }
    },
    // CSSlint Task
    csslint: {
      strict: {
        options: {
          csslintrc: '.csslintrc'
        },
        src: ['css/app.css']
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
          defaultHeight: "64px",
          colors: {
            colortheme1: "red",
            colortheme2: "blue",
            colortheme3: "green",
          }
        }
      }
    },
    // Grunt Styleguide Task
    styleguide: {
      options: {
        // global options
      },
      kss: {
        options: {
            framework: {
                name: 'kss'
            },
            name: 'Style Guide',
            template: {
                src: 'styleguide/kss_template/'
            }
        },
        files: {
            'styleguide': 'sass/*.scss'
        },
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
    },
    // UnCss Task
    uncss: {
      dist: {
        files: {
          'css/tidy.css': ['index_template.html']
        }
      }
    },
    // Palettable Task
    palettable: {
      options: {
        stylesDirectory: 'sass/',
        outputFilePath : 'styleguide/palette.html'
      }
    },
    //Pleease Shell
    shell: {
        pleeease: {
            command: 'pleeease compile'
        }
    }
  });

  // Require for Grunt Shell plugin
  require('load-grunt-tasks')(grunt);
  // Load the plugin that provides the "uglify" task
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // Load the plugin minify-html
  grunt.loadNpmTasks('grunt-minify-html');
  // Load the plugin html validation
  grunt.loadNpmTasks('grunt-html-validation');
  // Load the plugin CSSlint
  grunt.loadNpmTasks('grunt-contrib-csslint');
  // Load the plugin SVGMin
  grunt.loadNpmTasks('grunt-svgmin');
  // Load the plugin Grunt Icon
  grunt.loadNpmTasks('grunt-grunticon');
  // Load the plugin Grunt Styleguide
  grunt.loadNpmTasks('grunt-styleguide');
  // Load the plugin compass
  grunt.loadNpmTasks('grunt-contrib-compass');
  // Load the plugin uncss
  grunt.loadNpmTasks('grunt-uncss');
  // Load the plugin palettable
  grunt.loadNpmTasks('palettable');

  // Default task.
  grunt.registerTask('default', ['uglify', 'minifyHtml', 'validation', 'csslint:strict', 'shell:pleeease', 'svgmin', 'grunticon', 'palettable', 'styleguide', 'compass:dist']);
  // Prod task.
  grunt.registerTask('dev', ['svgmin', 'grunticon', 'palettable', 'csslint:strict', 'validation', 'compass:dev']);   


};