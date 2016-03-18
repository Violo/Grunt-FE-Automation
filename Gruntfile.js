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
     // html w3c validation
     validation: {
       options: {
         reset: grunt.option('reset') || false,
         stoponerror: false,
         relaxerror: [
            'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
            'Bad value “https://fonts.googleapis.com/',
            'The Content-Type was “text/html”. Using the HTML parser.',
            'Using the schema for HTML with SVG 1.1, MathML 3.0, RDFa 1.1, and ITS 2.0 support.',
            'lacks heading. Consider using “h2”-“h6” elements to add identifying headings to all',
            'Consider using the “h1” element as a top-level heading',
       ],
         generateReport: false,
         errorHTMLRootDir: "w3cErrorFolder",
         useTimeStamp: true
       },
       files: {
         src: ['index.html']
       }
     },
     // CSSlint Task
     csslint: {
       strict: {
         options: {
           csslintrc: '.csslintrc'
         },
         src: ['css/app.data.svg.css']
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
         outputFilePath: 'styleguide/palette.html'
       }
     },
     //Pleease Shell
     shell: {
       pleeease: {
         command: 'sh pleeease.sh'
       }
     },
     //Copy
     copy: {
       grunticon: {
         files: [{
           src: 'img/grunticon-assets/icons.data.svg.css',
           dest: 'sass/_icons_data_svg.scss'
         }, {
           src: 'img/grunticon-assets/icons.data.png.css',
           dest: 'sass/_icons_data_png.scss'
         }, {
           src: 'img/grunticon-assets/icons.fallback.css',
           dest: 'sass/_icons_fallback.scss'
         }],
       },
     },
     //Preprocess
     preprocess: {
       svg: {
         options: {
           context: {
             ICONS: '_icons_data_svg'
           }
         },
         files: {
           'sass/app.data.svg.scss': './app_template.scss'
         }
       },
       png: {
         options: {
           context: {
             ICONS: '_icons_data_png'
           }
         },
         files: {
           'sass/app.data.png.scss': './app_template.scss'
         }
       },
       fallback: {
         options: {
           context: {
             ICONS: '_icons_fallback'
           }
         },
         files: {
           'sass/app.fallback.scss': './app_template.scss'
         }
       }
     },
     // Connect
    connect: {
      server: {
        options: {
          port: 8080,
          base: '.',
          keepalive: true
        }
      }
    },
   });

   // Require for Grunt Shell plugin
   require('load-grunt-tasks')(grunt);

   // Load the plugin for copying files
   grunt.loadNpmTasks('grunt-contrib-copy');
   // Load the plugin for preprocessing sass files
   grunt.loadNpmTasks('grunt-preprocess');
   // Require for Grunt Shell plugin
   require('load-grunt-tasks')(grunt);
   // Load the plugin that provides the "uglify" task
   grunt.loadNpmTasks('grunt-contrib-uglify');
   // Load the plugin minify-html
   grunt.loadNpmTasks('grunt-minify-html');
   // Load the plugin html w3c validation
   grunt.loadNpmTasks('grunt-w3c-html-validation');
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
   // Load the plugin connect
   grunt.loadNpmTasks('grunt-contrib-connect');
 
   // Default task.
   grunt.registerTask('default', ['preprocess', 'uglify', 'minifyHtml', 'validation', 'csslint:strict', 'svgmin', 'grunticon', 'copy', 'palettable', 'styleguide', 'compass:dist', 'shell:pleeease']);
   // Prod task.
   grunt.registerTask('dev', ['preprocess', 'svgmin', 'grunticon', 'copy', 'palettable', 'csslint:strict', 'validation', 'compass:dev']);
   // Serve task.
   grunt.registerTask('serve', ['connect']);


 };