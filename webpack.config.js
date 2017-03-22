'use strict';

const HTMLPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  entry: `${__dirname}/app/entry.js`,
  output: {
    file: 'bundle.js',
    path: 'build'
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
        test: /\.scss$/,
        loader: 'style!css!sass!'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      {
        test: /\.(eot|woff|ttf|svg).*/,
        loader: 'url?limit=10000@name=fonts/[hash].[ext]'
      }
    ]
  }
};
