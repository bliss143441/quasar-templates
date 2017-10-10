var 
  config = require('../config'),
  webpack = require('webpack'),
  env = require('./env-utils'),
  merge = require('webpack-merge'),
  cssUtils = require('./css-utils'),
  { cloneDeep } = require('lodash'),
  baseWebpackConfig = require('./webpack.base.conf'),
  VueSSRServerPlugin = require('vue-server-renderer/server-plugin'),
  nodeExternals = require('webpack-node-externals'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  path = require('path'),
  FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

const projectRoot = path.resolve(__dirname, '../')
const baseConfig = cloneDeep(baseWebpackConfig)

module.exports = Object.assign({}, baseConfig, {
  target: 'node',
  watch: true,
  devServer: undefined,
  devtool: env.prod
    ? false
    : 'source-map',
  entry: [
    path.resolve(
      __dirname, `../`, 
      config.serverFolder || 'api', 
      config.ssrFile
    )
  ],
  output: {
    libraryTarget: 'commonjs2',
    path: path.resolve(__dirname, '../dist'),
    publicPath: config[env.prod ? 'build' : 'dev'].publicPath,
  },
  // https://webpack.js.org/configuration/externals/#function
  // https://github.com/liady/webpack-node-externals
  // Externalize app dependencies. This makes the server build much faster
  // and generates a smaller bundle file.
  externals: nodeExternals({
    // do not externalize dependencies that need to be processed by webpack.
    // you can add more file types here e.g. raw *.vue files
    // you should also whitelist deps that modifies `global` (e.g. polyfills)
    whitelist: /(\.css$|\.less$|\.sass$|\.scss$|\.styl$|\.stylus$|\.(png|jpe?g|gif|svg)(\?.*)?$|\.(woff2?|eot|ttf|otf)(\?.*)?$)/
  }),
  module: {
    rules: cssUtils.styleRules({
      sourceMap: false,
      extract: true,
      postcss: true
    }).concat([
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: projectRoot,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: cssUtils.postcss,
          loaders: merge({js: 'babel-loader'}, cssUtils.styleLoaders({
            sourceMap: false,
            extract: true
          }))
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'img/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'fonts/[name].[hash:7].[ext]'
        }
      }
    ])
  },
  plugins: baseConfig.plugins.concat([
    new VueSSRServerPlugin(),
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css'
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new FriendlyErrorsPlugin({
      clearConsole: config.dev.clearConsoleOnRebuild
    })
  ]),
  performance: {
    hints: false
  }
})