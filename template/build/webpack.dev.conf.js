var
  config = require('../config'),
  path = require('path'),
  webpack = require('webpack'),
  merge = require('webpack-merge'),
  cssUtils = require('./css-utils'),
  WebpackCleanupPlugin = require('webpack-cleanup-plugin'),
  baseWebpackConfig = require('./webpack.base.conf'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/hot-reload.js', baseWebpackConfig.entry[name]]
})

module.exports = merge(baseWebpackConfig, {
  // eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    historyApiFallback: true,
    noInfo: true
  },
  watch: true,
  module: {
    rules: cssUtils.styleRules({
      sourceMap: config.dev.cssSourceMap,
      postcss: true
    })
  },
  output: {
    path: path.resolve(__dirname, '../tmp'),
    filename: 'js/[name].js',
    publicPath: config.dev.publicPath,
    chunkFilename: 'js/[id].[chunkhash].js'
  },
  plugins: [
    new WebpackCleanupPlugin({
      exclude: ["index.html"],
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true
    }),
    new FriendlyErrorsPlugin({
      clearConsole: config.dev.clearConsoleOnRebuild
    })
  ],
  performance: {
    hints: false
  }
})
