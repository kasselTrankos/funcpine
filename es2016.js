var fs = require("fs"),
  vueify = require('vueify'),
	watchify = require('watchify'),
  babelify = require('babelify'),
  browserify = require("browserify");
var b = browserify({
	  plugin: [watchify],
	  entries: ["lib/index.js"],
	  cache: {},
  	debug: true,
  	packageCache: {},
})
.transform(vueify)
.transform(babelify, {
  	presets: ['es2016'],
  	plugins: ['transform-vue-jsx', 'transform-object-rest-spread']
});

b
.on('update', bundle)
.bundle()
.pipe(fs.createWriteStream("build.js"));


console.log(`Created code at ${new Date().toISOString()}`);
function bundle(err){
  	console.log(`Updated code at ${new Date().toISOString()}`);
  	b.bundle().pipe(fs.createWriteStream("build.js"));
  }