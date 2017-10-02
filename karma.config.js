module.exports = function(config) {
    config.set({
        frameworks: ['mocha', 'chai'],
        files: [
            // 'node_modules/chai/chai.js',
            // 'node_modules/sugar/index.js',
            'js/kingdom.ts',
            'tests/main.ts'
        ],
        plugins:[
            'karma-chai',
            'karma-mocha',
            'karma-coverage',
            'karma-spec-reporter',
            'karma-phantomjs-launcher',
            'karma-babel-preprocessor',
            'karma-typescript-preprocessor'
        ],
        preprocessors: {
            '**/*.ts'      : ['typescript'],
            '**/*.js'      : ['babel'],
            // './js/tests/**/*[sS]pec.ts'    : ["karma-typescript"]
        },
        babelPreprocessor: {
            options: {
                presets: ['es2015'],
            }
        },
        typescriptPreprocessor: {
            // options passed to the typescript compiler
            options: {
                sourceMap: true, // (optional) Generates corresponding .map file.
                target: 'ES6', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
                noImplicitAny: true, // (optional) Warn on expressions and declarations with an implied 'any' type.
                noResolve: true, // (optional) Skip resolution and preprocessing.
                // removeComments: true, // (optional) Do not emit comments to output.
                // concatenateOutput: false // (optional) Concatenate and emit output to single file. By default true if module option is omited, otherwise false.
            },

        },
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
