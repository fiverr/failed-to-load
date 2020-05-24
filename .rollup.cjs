const commonjs = require('@rollup/plugin-commonjs');
const { default: resolve } = require('@rollup/plugin-node-resolve');

module.exports = {
  input: 'integration/test.js',
  output: {
    file: 'integration/.compiled.js',
    format: 'iife'
  },
  plugins: [
    commonjs(),
    resolve()
  ]
}
