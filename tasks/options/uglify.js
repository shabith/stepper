module.exports = {
  build: {
    src: '<%= concat.dist.dest %>',
    dest: '<%= config.dist %>/<%= pkg.name %>.min.js'
  },
  options: {
  	banner: '<%= banner %>'
  }
}