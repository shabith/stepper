module.exports = {
  development: {
    options: {
      compress: false,
      paths: ["<%= config.src %>/less"],
    },
   files: {
          "<%= config.src %>/css/stepper.css": "<%= config.src %>/less/**/*.less" // destination file and source file
        }
  },
  production: {
    options: {
      compress: true,
      paths: ["<%= config.src %>/less"],
    },
    files: {
          "<%= config.src %>/css/stepper.css": "<%= config.src %>/less/**/*.less" // destination file and source file
        }
  }
}