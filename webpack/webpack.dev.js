const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  mode: 'development',
  plugins: [new Dotenv({ path: './.env.development' })],
  output: {
    path: path.join(__dirname, '../dev/js'),
    filename: '[name].js',
  },
});
