const webpack = require('webpack')
const { merge } = require('webpack-merge')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
var webpackBaseConfig = require('./webpack.config.js')

// 清空基本配置的插件列表
webpackBaseConfig.plugins = []

module.exports = merge(webpackBaseConfig, {
  output: {
    publicPath: '/dist/',
    // 将入口文件重命名为带有20位hash值的唯一文件
    filename: '[name].[contenthash].js'
  },
  // 可省略，生产环境默认开启
  // optimization: {
  //   minimize: true,
  //   minimizer: [new TerserPlugin()]
  // },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
      chunkFilename: "[id].[contenthash].css"
    }),
    // 定义当前node环境为生产环境
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // 提取模板，并保存入口html文件
    new HtmlWebpackPlugin({
      filename: '../index_prod.html',
      template: './index.ejs',
      inject: false
    })
  ]
})