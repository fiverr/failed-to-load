const { join } = require('path');

const file = 'integration/test.js';

module.exports = (config) => {
    const { LOG_INFO: logLevel } = config;

    config.set({
        browsers: [ 'Chrome' ],
        frameworks: [ 'mocha' ],
        port: 9876,
        logLevel,
        singleRun: true,
        concurrency: 1,
        hooks : [
            'karma-webpack',
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-mocha-reporter'
        ],
        reporters: [ 'mocha' ],
        basePath: __dirname,
        customContextFile: join(__dirname, 'integration/context.html'),
        files: [ file ],
        preprocessors: { [file]: [ 'webpack' ] },
        webpack: {}
    });
};
