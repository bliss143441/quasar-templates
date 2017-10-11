var
  config = require('../config'),
  webpack = require('webpack'),
  path = require('path'),
  merge = require('webpack-merge'),
  cssUtils = require('./css-utils'),
  baseWebpackConfig = require('./webpack.base.conf'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin'),
  WebpackCleanupPlugin = require('webpack-cleanup-plugin'),
  VueSSRClientPlugin = require('vue-server-renderer/client-plugin'),
  ExtractTextPlugin = require('extract-text-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = [path.resolve(__dirname, '../build/hot-reload.js'), baseWebpackConfig.entry[name]]
})

module.exports = merge(baseWebpackConfig, {
  // eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  watch: true,
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  module: {
    rules: cssUtils.styleRules({
      sourceMap: config.dev.cssSourceMap,
      postcss: true,
      extract: true
    })
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: config.dev.publicPath
  },
  plugins: [
    new WebpackCleanupPlugin({
      exclude: ["index.html"],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    }),
    new VueSSRClientPlugin(),
    new FriendlyErrorsPlugin({
      clearConsole: config.dev.clearConsoleOnRebuild
    })
  ].concat(
    !process.env.dismissHTML ? 
      [
        new HtmlWebpackPlugin({
          filename: 'index.html',
          template: path.resolve(__dirname, '../src/index.html'),
          inject: true
        })
      ] : []
  ),
  performance: {
    hints: false
  }
})