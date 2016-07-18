module.exports = function (grunt) {
  grunt.initConfig({

    watch: {
      options: {
        interrupt: true,
        livereload: true,
      },
      // scripts: {
      //   files: [ 'Gruntfile.js', 'js/*.js', 'css/*.css', '!**/all.**' ],
      //   tasks: ['prod']
      // },
      html: {
        files: ['**/*.html']
      },
      css: {
        files: ['scss/**/*.scss'],
        tasks: ['css']
      }
    },

    sass: {
      options: {
        style: 'expanded',
        sourcemap: 'none',
        noCache: true
      },
      single_file: {
        files: {
          'dist/css/style.css': 'scss/general.scss'
        }
      }
    },

    cssmin: {
      my_target: {
        files: [{
          expand: true,
          cwd: 'dist/css/',
          src: ['*.css', '!*.min.css'],
          dest: 'dist/css/',
          ext: '.min.css'
        }]
      }
    },

    postcss: {
      options: {
        safe: true,
        processors: [
          require('autoprefixer-core')({browsers: 'last 2 version'})
        ]
      },
      dist: {
        expand: true,
        cascade: true,
        remove: true,
        cwd: 'dist/css/',
        src: ['*.css', '!*.min.css'],
        dest: 'dist/css/'
      }
    },

    uglify: {
      my_target: {
        files: [{
          expand: true,
          flatten: true,
          mangle: false,
          cwd: 'dist/js/',
          src: [
          '*.js',
          '!*.min.js'
          ],
          dest: 'dist/js/',
          ext: '.min.js'
        }]
      }
    },

    concat: {
      basic: {
        files: {
          'dist/css/style.css': [
            '../normalize.css/normalize.css',
            'dist/css/style.css'
          ],
        },
      },
      // extras: {
      //   options: {
      //     separator: ';'
      //   },
      //   files: {
      //     'js/all.js': [
      //     'js/minified/move-top.min.js',
      //     ],
      //   }
      // }
    }

  });

grunt.loadNpmTasks('grunt-contrib-uglify');
grunt.loadNpmTasks('grunt-contrib-cssmin');
grunt.loadNpmTasks('grunt-contrib-concat');
grunt.loadNpmTasks('grunt-contrib-watch');
grunt.loadNpmTasks('grunt-contrib-sass');
grunt.loadNpmTasks('grunt-postcss');

grunt.registerTask( 'default', [ 'css', 'watch' ] );
grunt.registerTask( 'css', [ 'sass', 'postcss', 'concat:basic', 'cssmin' ] );
grunt.registerTask( 'js', [ 'uglify' ] );

};