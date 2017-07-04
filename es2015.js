var fs = require("fs");
var browserify = require("browserify");
browserify({
	sourceType: 'module',
	entries: ["lib/index.js"],
	debug: true
}).transform("babelify", {
  	presets: ["es2016"],
  	plugins: ['transform-object-rest-spread']
  })
  .bundle()
  .pipe(fs.createWriteStream("app/js/bundle.js"));