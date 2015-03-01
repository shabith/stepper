module.exports = {
  dist: {
    src: [
      '<%= config.js %>'
    ],
    dest: '<%= config.dist %>/<%= pkg.name %>.js'
  },
  options: {
  	banner: '<%= banner %>',
  	stripBanners: true
  }
}