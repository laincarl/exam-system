const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config');

// const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = merge(baseConfig, {
  mode: 'production',
  // entry: './src/index.prod',
  devtool: false,
  // entry: './src/index.js',
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   beautify: false, // 最紧凑的输出
    //   comments: false, // 删除注释
    //   compress: {
    //     warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
    //     drop_console: true, // 删除所有console语句
    //     collapse_vars: true, // 内嵌定义了但是只用到一次的变量
    //     reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
    //   },
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
    }),  

    // Transfer Files
    /* new CopyWebpackPlugin([
      {from: 'src/www/css', to: 'css'},
      {from: 'src/www/images', to: 'images'}
    ]), */
  ],
});
