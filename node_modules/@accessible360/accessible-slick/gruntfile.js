var sass = require('node-sass');

module.exports = function(grunt) {
  grunt.initConfig({
    // Convert Sass to CSS
    sass: {
      options: {
        implementation: sass
      },
      dist: {
        files: {
          'slick/slick.min.css': 'slick/slick.scss',
          'slick/slick-theme.min.css': 'slick/slick-theme.scss'
        }
      }
    },

    // Add vendor prefixes to CSS
    postcss: {
      options: {
        map: false,
        processors: [
          require('autoprefixer')({
            browsers: ['last 2 versions'],
          }),
        ],
      },
      dist: {
        src: 'slick/*.min.css',
        expand: true
      },
    },

    // Minify the CSS
    cssmin: {
      target: {
        files: [
          {
            expand: true,
            cwd: 'slick/',
            src: '*.min.css',
            dest: 'slick/'
          },
        ],
      },
    },

    // Minify the JavaScript
    uglify: {
      target: {
        files: [{
          expand: true,
          cwd: 'slick/',
          src: '*.js',
          dest: 'slick/',
          ext: '.min.js'
        }]
      }
    },

    // Automatically kick off rebuilds when source file changes are detected
    watch: {
      css: {
        files: ['slick/*.scss'],
        tasks: ['sass','postcss','cssmin']
      },
      js: {
        files: ['slick/*.js','!slick/*.min.js'],
        tasks: ['uglify']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['sass','postcss','cssmin', 'uglify']);
};