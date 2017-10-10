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
  baseWebpackConfig.entry[name] = ['./build/hot-reload.js', baseWebpackConfig.entry[name]]
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
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        )
      }
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    }),
    new VueSSRClientPlugin(),
    new FriendlyErrorsPlugin({
      clearConsole: config.dev.clearConsoleOnRebuild
    })
  ],
  performance: {
    hints: false
  }
})