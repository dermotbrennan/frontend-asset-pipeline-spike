module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'javascripts/app.js',
        dest: 'build/app.min.js'
      }
    },
    'http-server': {

      'dev': {

        // the server root directory
        root: './',

        port: 8282,
        // port: function() { return 8282; }

        host: "127.0.0.1",

        cache: 0,
        showDir : true,
        autoIndex: true,

        // server default file extension
        ext: "html",

        // run in parallel with other tasks
        runInBackground: false
      }
    }
  });


  grunt.loadNpmTasks('grunt-http-server');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};