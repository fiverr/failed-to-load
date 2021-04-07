const { join } = require('path');

const file = 'integration/test.js';

module.exports = (config) => {
    const { LOG_INFO: logLevel } = config;

    config.set({
        files: [ file ],
        basePath: __dirname,
        customContextFile: join(__dirname, 'integration/context.html'),

        browsers: [ 'Chrome' ],
        frameworks: [ 'mocha' ],
        reporters: [ 'mocha' ],
        plugins : [
            require('karma-webpack'),
            require('karma-chrome-launcher'),
            require('karma-mocha'),
            require('karma-mocha-reporter')
        ],
        preprocessors: { [file]: [ 'webpack' ] },
        webpack: {},

        port: 9876,
        logLevel,
        singleRun: true,
        concurrency: 1
    });
};
