module.exports = {
  options: {
    livereload: true
  },
  gruntfile: {
    files: '<%= jshint.gruntfile.src %>',
    tasks: ['pro']
  },
  js: {
    files: ['<%= config.js %>', '**/*.spec.js'],
    tasks: ['jshint'],
    options: {
      spawn: false,
    }
  },
  less: {
    files: '<%= config.src %>/less/**/*.less',
    tasks: ['less:development'],
    options: {
          nospawn: true
        }
  },
  html:{
    files: ['<%= config.app %>/**/*.html'],
    tasks: [],
    options: {
      spawn: false
    }
  }
}