module.exports = {
  gulp: {
    files:
    ["./gulpfile.js", "./gulp-config.js"],
  },
  // The resource paths.
  product: {
    // Directories containing solely Gulp generated files.  gulp clean
    // deletes these directories.
    dirs: ["asset/css"],

    // List of generated files.  These files are watched and cleaned.
    files: ["asset/css"],

  },

  sass: {
    sources: ["asset/sass/**/*.scss"],
    destination: "asset/css",
  }
};
