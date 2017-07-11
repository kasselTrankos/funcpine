module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', 'browserify'],
    files: [
      'tests/**/*.spec.js'
    ],
    exclude: [],
    preprocessors: {
      'tests/**/*.spec.js': ['browserify']
    },
    browserify: {
      transform: [ 'babelify', ['stringify', { extensions: ['.html'] }] ]
    },
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity
  })
}