"use strict";

// Points at the shared config in @dltg/gulp-build so this project
// never has its own copy of the rules to drift out of sync.
//
// To layer project-specific overrides on top:
//   const base = require("@dltg/gulp-build/eslint-config");
//   module.exports = [...base, { rules: { /* overrides */ } }];

module.exports = require("@dltg/gulp-build/eslint-config");