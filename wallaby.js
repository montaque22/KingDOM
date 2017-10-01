const wallabyWebpack        = require('wallaby-webpack');
const path                  = require('path');
const webpackPostprocessor  = wallabyWebpack({});
// var babel = require('babel');
const webpack = {

    output: {
        libraryTarget: "umd",
    },

    // module: {
    //     rules: [
    //         {
    //             test: /\.js?$/,
    //             use: ['babel-loader'],
    //             exclude: /node_modules/
    //         }
    //     ]
    // }
};

module.exports = function (wallaby) {
    return {
        files: [
            { pattern: 'node_modules/chai/chai.js', instrument: false },
            { pattern: 'js/*.ts', load:false},
            // { pattern: 'js/kingdom.js'}
        ],

        tests: [
            {pattern: 'tests/*.ts', load: false}
        ],
        testFramework: 'mocha',


        compilers: {
            '.**/*.ts': wallaby.compilers.typeScript(),
            // '.**/*.js': wallaby.compilers.babel()
        },
        preprocessors: {
            '**/*.js': file => require('babel-core').transform(
                file.content,
                {sourceMap: true, presets: ['es2015']})
        },

        postprocessor: wallabyWebpack(),

        setup: function () {
            window.expect = chai.expect;
            window.__moduleBundler.loadTests();
        },

        debug: true

    };
};
