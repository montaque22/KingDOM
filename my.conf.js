// Karma configuration
// Generated on Tue May 09 2017 17:10:20 GMT-0400 (EDT)

module.exports = function(config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', "karma-typescript"],


        // list of files / patterns to load in the browser
        files: [
            './dist/kingdom.js',
            'test/**/*[sS]pec.js',
            './js/vendor/**/*.js',
        ],


        // list of files to exclude
        exclude: [
        ],

        plugins:[
            'karma-jasmine',
            'karma-coverage',
            'karma-spec-reporter',
            'karma-typescript',
            'karma-phantomjs-launcher',
            'karma-jasmine-html-reporter'
        ],

        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            './dist/kingdom.js'      : ['coverage'],
            // './js/tests/**/*[sS]pec.ts'    : ["karma-typescript"]
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage', 'kjhtml', 'spec', "karma-typescript"],

        coverageReporter: {
            reporters: [
                {
                    type: 'html',
                    dir: 'coverage/',
                    instrumenterOptions: {
                        istanbul: { noCompact: true}
                    }
                },
                {
                    type: 'text-summary'
                }
            ]
        },

        specReporter: {
            maxLogLines: 5,             // limit number of lines logged per test
            suppressErrorSummary: true, // do not print error summary
            suppressFailed: false,      // do not print information about failed tests
            suppressPassed: false,      // do not print information about passed tests
            suppressSkipped: true,      // do not print information about skipped tests
            showSpecTiming: false,      // print the time elapsed for each spec
            failFast: true              // test would finish with error when a first fail occurs.
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['PhantomJS'],

        // browsers: ['Chrome', 'Firefox', 'Safari', 'PhantomJS'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity
    })
}
