
module.exports = function (wallaby) {
    return {

        files: [
            { pattern: 'js/*.ts' },
        ],

        tests: [
            { pattern: 'tests/main.ts'}
        ],

        testFramework: 'mocha',


        preprocessors: {
            '**/*.js': file => require('babel-core').transform(
                file.content,
                {sourceMap: true, presets: ['es2015']})
        },

        env: {
            type: 'node'
        }

    };
};
