// -------------------------------------
// Common Gulp functions used by the Library
// CSS projects.
// -------------------------------------

// -------------------------------------
// Modules
// -------------------------------------

// gulp              : The streaming build system
// gulp-autoprefixer : Prefix CSS
// gulp-concat       : Concatenate files
// gulp-clean-css    : Minify CSS
// gulp-load-plugins : Automatically load Gulp plugins
// gulp-rename       : Rename files
// gulp-sass         : Compile Sass
// gulp-sass-glob    : Provide Sass Globbing
// gulp-sass-lint    : Lint Sass
// gulp-sourcemaps   : Generate sourcemaps
// gulp-watch        : Watch stream
// browser-sync      : Device and browser testing tool
// del               : delete
// gulp-eslint       : JavaScript code quality tool
// gulp-uglify       : Minify JavaScript with UglifyJS
// -------------------------------------

// $ = Convenient namespace for included modules.
const $ = {};

$.autoprefixer = require("gulp-autoprefixer");
$.cleanCSS = require("gulp-clean-css");
$.color = require("ansi-colors");
$.concat = require("gulp-concat");
$.crypto = require("crypto");
$.esLint = require("gulp-eslint7");
$.fsCache = require("gulp-fs-cache");
$.gulp = require("gulp");
$.log = require("fancy-log");
$.path = require("path");
$.plumber = require("gulp-plumber");
$.rename = require("gulp-rename");
$.sass = require("gulp-sass")(require("sass"));
$.sassGlob = require("gulp-sass-glob");
$.sourcemaps = require("gulp-sourcemaps");
$.stylelint = require("gulp-stylelint");
$.through = require("through2");
$.uglify = require("gulp-uglify");

// Exported functions
const gulpFuncs = {};

gulpFuncs.concatCSS = (sources, destination) => {
  return $.gulp
    .src(sources)
    .pipe($.sourcemaps.init({ loadMaps: true }))
    .pipe($.concat($.path.basename(destination)))
    .pipe($.sourcemaps.write())
    .pipe($.gulp.dest($.path.dirname(destination)));
};

/** Compile SASS files into CSS
 * @param {array} sources a list of files to lint and compile
 * @param {string} destination the directory into which to put the compiled results
 * @return {stream} the Node stream representing the compiled files.
 */
gulpFuncs.lintAndCompileSASS = (sources, destination) => {
  return $.gulp
    .src(sources)
    .pipe(
      $.sourcemaps.init({
        loadMaps: true,
        largeFile: true,
      })
    ) // Sourcemaps in Gulp 4 core is not working as well.
    .pipe($.sassGlob())
    .pipe(
      $.stylelint({
        reporters: [{ formatter: "string", console: true }],
      })
    )
    .pipe(
      $.sass({
        errLogToConsole: true,
        outputStyle: "expanded",
      })
    )
    .pipe(
      $.autoprefixer({
        cascade: false,
      })
    )
    .pipe($.sourcemaps.write("./"))
    .pipe($.gulp.dest(destination));
};

// Validate the JavaScript sources
gulpFuncs.jsLint = (sources) => {
  return $.gulp
    .src(sources)
    .pipe($.plumber())
    .pipe($.esLint())
    .pipe($.esLint.format())
    .pipe($.esLint.failAfterError());
};

// Produce minified JavaScript files
gulpFuncs.jsUglify = (sources, destination) => {
  return $.gulp
    .src(sources)
    .pipe($.plumber())
    .pipe($.fsCache(".gulp-cache/js"))
    .pipe($.uglify())
    .pipe($.fsCache(".gulp-cache/js").restore)
    .pipe(
      $.rename({
        suffix: ".min",
      })
    )
    .pipe($.gulp.dest(destination));
};

gulpFuncs.minifyCSS = (sources, destination) => {
  return $.gulp
    .src(sources)
    .pipe(
      $.sourcemaps.init({
        loadMaps: true,
        largeFile: true,
      })
    )
    .pipe(
      $.cleanCSS(
        {
          compatibility: "ie11",
        },
        (details) => {
          details.errors.forEach((msg) => {
            $.log.error($.color.red(msg));
          });
          details.warnings.forEach((msg) => {
            $.log.warn($.color.yellow(msg));
          });
        }
      )
    )
    .pipe(
      $.rename({
        suffix: ".min",
      })
    )
    .pipe($.sourcemaps.write("./"))
    .pipe($.gulp.dest(destination));
};

// Record checksums of all the source files so
// CI/CD can later validate the build products
// against the sources.
gulpFuncs.updateSourceChecksums = (sources, checksumFile) => {
  const root = process.cwd();

  return $.gulp
    .src(sources)
    .pipe(
      $.through.obj((file, enc, cb) => {
        const shasum = $.crypto.createHash("sha256");
        shasum.update(file.contents);
        const relpath = $.path.relative(root, file.path);
        file.contents = Buffer.from(`${shasum.digest("hex")} ${relpath}`);
        cb(null, file);
      })
    )
    .pipe($.concat($.path.basename(checksumFile)))
    .pipe($.gulp.dest($.path.dirname(checksumFile)));
};

module.exports = gulpFuncs;
