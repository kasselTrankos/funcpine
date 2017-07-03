var fs = require("fs");
var browserify = require("browserify");
browserify("lib/index.js")
  .transform("babelify", {presets: ["es2015"]})
  .bundle()
  .pipe(fs.createWriteStream("app/js/bundle.js"));