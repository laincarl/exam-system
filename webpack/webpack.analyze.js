/*
 * @Author: LainCarl 
 * @Date: 2018-05-19 16:58:41 
 * @Last Modified by: LainCarl
 * @Last Modified time: 2018-05-19 16:59:02
 * @Feature: webpack打包分析 
 */

const merge = require('webpack-merge');
const proConfig = require('./webpack.production');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = merge(proConfig, {
  plugins: [
    new BundleAnalyzerPlugin(),
  ],
});
