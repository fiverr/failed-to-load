const { join } = require('path');
const { output: { file } } = require('./.rollup.cjs');

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
            'karma-chrome-launcher',
            'karma-mocha',
            'karma-mocha-reporter'
        ],
        reporters: [ 'mocha' ],
        basePath: __dirname,
        customContextFile: join(__dirname, 'integration/context.html'),
        files: [ file ]
    });
};
