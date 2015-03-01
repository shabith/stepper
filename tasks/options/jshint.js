module.exports = {
  beforeconcat: ['<%= config.js %>'],
  options: {
  	curly: true,
    eqeqeq: true,
    immed: true,
    latedef: true,
    newcap: true,
    noarg: true,
    sub: true,
    undef: true,
    unused: true,
    multistr: true,
    boss: true,
    eqnull: true,
    browser: true,
    globals: {
      angular: true,
      module: true,
      require: true
    }
  },
  gruntfile: {
	src: 'Gruntfile.js'
  }
}