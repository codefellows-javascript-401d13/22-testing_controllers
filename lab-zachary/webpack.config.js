'use strict';

const HTMLPlugin  = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: './app/entry.js',
  output: {
    path: 'build',
    filename: 'bundle.js'
  },
  plugins: [
    new HTMLPlugin({
      template: `${__dirname}/app/index.html`
    }),
    new ExtractTextPlugin('bundle.css')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass!'
      },
      {
        test: /\.(eot|woff|ttf|svg|otf).*/,
        loader: 'url?limit=10000&name=fonts/[hash].[ext]'
      }
    ]
  }
};