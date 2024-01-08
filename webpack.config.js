const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
  entry: {
    background: './src/background.js',
    options: './src/options/options.js',
    popup: './src/popup/popup.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'manifest.json', to: 'manifest.json' },
        { from: 'src/options/options.html', to: 'options.html' },
        { from: 'src/popup/popup.html', to: 'popup.html' },
        { from: 'src/options/options.css', to: 'options.css' },
      ]
    }),
    new Dotenv(),
    new NodePolyfillPlugin()
  ],
  module: {
    rules: [
      // Rules for CSS, and other file types
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
    modules: [
      path.resolve('src'),
      path.resolve('node_modules')
    ]
  },
  mode: 'development', // Or 'production'
  devtool: 'inline-source-map', // Remove for production

};
