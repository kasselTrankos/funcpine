var fs = require("fs"),
	watchify = require('watchify');
var browserify = require("browserify");
var b = browserify({
	sourceType: 'module',
	plugin: [watchify],
	cache: true,
	entries: ["lib/index.js"],
	debug: true
}).transform("babelify", {
  	presets: ["es2016"],
  	plugins: ['transform-object-rest-spread']
  });

  b.bundle()
  .on('update', function(){
  	console.log('File updated!!!!');
  	b.bundle().pipe(fs.createWriteStream("app/js/bundle.js"));
  })
  .pipe(fs.createWriteStream("app/js/bundle.js"));