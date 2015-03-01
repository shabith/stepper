module.exports = {
  production: {
        cwd: '<%= config.src %>/css',
        src: [ '**' ],
        dest: '<%= config.dist %>/',
        expand: true
      }
}