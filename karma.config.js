module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai'],
        files: [
            'node_modules/chai/chai.js',
            'dist/**.js',
            'tests/browser-test.js'
        ],
        plugins:[
            'karma-chai',
            'karma-mocha',
            'karma-coverage',
            'karma-spec-reporter',
            'karma-phantomjs-launcher'
        ],
        reporters: ['progress', 'coverage', 'spec'],
        port: 9876,  // karma web server port
        colors: true,
        browsers: ['PhantomJS'],
        logLevel: config.LOG_INFO,
        autoWatch: false,
        singleRun: true,
        concurrency: Infinity
    })
};
