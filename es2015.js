var fs = require("fs");
var browserify = require("browserify");
browserify({entries: ["lib/index.js"], debug: true})
  .transform("babelify", 
  	{
  		presets: ["es2015"],
  		plugins: ["transform-object-rest-spread"]
  	})
  .bundle()
  .pipe(fs.createWriteStream("app/js/bundle.js"));