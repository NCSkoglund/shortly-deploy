module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {separator: ';'},
      dist: {
        src: ['public/client/**/*.js'],
        dest: 'public/dist/<%= pkg.name %>.js'
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    },

    uglify: {
      target: {
        files: {
          'public/dist/<%= pkg.name %>.min.js': ['public/client/**/*.js']
        }
      }
    },

    eslint: {
      target: [
        'public/client/**/*.js',
        'app/**/*.js',
        'app/*.js',
        'lib/*.js'
      ]
    },

    cssmin: {
      options: {
        shorthandCompacting: false,
        roundingPrecision: -1
      },
      target: {
        files: {
          'public/styles.min.css': ['public/*.css']
        }
      }
    },

    watch: {
      scripts: {
        files: [
          'public/client/**/*.js',
          'public/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'eslint',
          'uglify' 
        ]
      },
      css: {
        files: 'public/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      prodServer: {
        command: 'git push live master'
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-nodemon');

  ////////////////////////////////////////////////////
  // Main grunt tasks
  ////////////////////////////////////////////////////
  

  // set up live updates on development server
  grunt.registerTask('server-dev', function (target) {
    grunt.task.run([ 'nodemon', 'watch' ]);
  });

  // run mocha tests
  grunt.registerTask('test', [
    'mochaTest'
  ]);

  // prep files for deployment w/ concat & uglify
  grunt.registerTask('build', ['concat', 'uglify']);

  // test and lint prior to git push
  grunt.registerTask('deploy', function(n) {    
    grunt.task.run(['test', 'eslint']);
  });

  // runs post-build (concat, uglify)
  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      grunt.task.run('deploy');  // test, eslint
      grunt.task.run('shell'); // git push live master
    } else {
      grunt.task.run([ 'server-dev' ]); // set up nodemon and watch
    }
  });
  
  // CLI: npm start:  
  //   runs build (prep files for deployment w/ concat & uglify)
  //   runs grunt upload 
};
