module.exports = function(grunt){
	grunt.registerTask('pro', ['concat', 'uglify', 'copy:production', 'less:production'])
}