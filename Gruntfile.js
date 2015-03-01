module.exports = function(grunt) {

  // Utility to load the different option files
  // based on their names
  function loadConfig(path) {
    var glob = require('glob');
    var object = {};
    var key;

    glob.sync('*', {cwd: path}).forEach(function(option) {
      key = option.replace(/\.js$/,'');
      object[key] = require(path + option); 
    });

    return object;
  }

  // Initial config
  var config = {
    pkg: grunt.file.readJSON('package.json'),
    config: {
      dist: './dist',
      src: './src',
      js: '<%= config.src %>/**/*.js',
      app: './'
    },
    clean: ['<%= config.dist %>'],
    copy: {

    },
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= pkg.author %> <%= grunt.template.today("yyyy") %>;' +
      ' Licensed <%= pkg.license %> */\n'
  };

  // Load tasks from the tasks folder
  grunt.loadTasks('tasks');

  // Load all the tasks options in tasks/options base on the name:
  // watch.js => watch{}
  grunt.util._.extend(config, loadConfig('./tasks/options/'));

  grunt.initConfig(config);

  require('load-grunt-tasks')(grunt);

  // Default Task is basically a rebuild
  grunt.registerTask('default', ['connect', 'watch']);


};