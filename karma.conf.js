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
      transform: [ ['babelify', {presets: ["es2015"]}]],
    },
    reporters: ['progress', 'html'],
    coverageReporter :{
      type : 'text',
      dir : 'coverage/',
      file : 'coverage.txt'
    },
    htmlReporter: {
      outputFile: 'testresult.html',
      // Optional
      pageTitle: 'BDD Unit Tests',
      subPageTitle: 'Func Pine Test!!!',
      groupSuites: true,
      useCompactStyle: true,
      useLegacyStyle: true
    },
    port: 8231,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true
  })
}