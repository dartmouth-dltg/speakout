module.exports = {
  gulp: {
    files: ["./gulpfile.js", "./gulp-config.js"],
  },

  product: {
    dirs: ["asset/css"],
    files: ["asset/css"],
  },

  sass: {
    sources: ["asset/sass/**/*.scss"],
    destination: "asset/css",
  },
};