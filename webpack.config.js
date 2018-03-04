var path = require('path');
const fs = require('fs')
const webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LessThemePlugin = require('webpack-less-theme-plugin');
const lessToJs = require('less-vars-to-js');
const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './theme.less'), 'utf8'));
module.exports = {
  // devtool: 'cheap-module-eval-source-map',
  devtool: 'eval',
  entry: {
    app: ['react-hot-loader/patch', 'babel-polyfill', './src/index.js'],
    // vendor: ['react', 'react-dom'], //分离第三方库
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',//以保证 hot reloading 会在嵌套的路由有效。
    filename: 'app/[name]_[hash:8].js',
    chunkFilename: 'app/chunks/[name].[chunkhash:5].chunk.js',
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'node_modules')], //优化webpack文件搜索范围
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.less'],
    alias: {
      Loading: path.resolve(__dirname, './src/component/common/Loading.js'),      
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: process.env.NODE_ENV === 'production' ? false : true,
              // modifyVars:themeVariables//定制antd主题
            },
          },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'react-hot-loader/webpack',
        }, {
          loader: 'babel-loader',
          query: {
            plugins: [['import', { libraryName: 'antd', style: true }]], // style: true 会加载 less 文件 style: 'css' 会加载 css 文件
          },
        }
        ],
      },
      {
        test: /\.(ttf|eot|svg|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './app/assets/',
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img_[hash:8].[ext]',
              outputPath: './app/assets/',
            },
          },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    compress: true,
    port: 3000,
    host: '0.0.0.0',//允许局域网通过ip访问
    public: 'localhost:3000',//加了host之后，open会打开0.0.0.0，所以需要定义public
    stats: 'errors-only',
    open: true,
    proxy: {
      // '/kanban/*': {
      //   target: 'http://localhost:8000',
      //   changeOrigin: true,
      //   pathRewrite: { '^/kanban': '' },
      // },
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: {'^/api' : ''}
      },
      // proxy: {
      //   '/api/**': {
      //     target: 'http://123.207.142.127:8378',
      //     changeOrigin: true,
      //   },
      // },
    },
  },
  plugins: [
    new LessThemePlugin({ theme: './theme.less' }),//使antd主题可以热加载
    new ExtractTextPlugin('styles.css'),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'], //name是提取公共代码块后js文件的名字。
      // chunks: ['vendor'] //只有在vendor中配置的文件才会提取公共代码块至manifest的js文件中
    }),
    new HtmlWebpackPlugin({
      title: '首页',
      inject: true,
      minify: {
        html5: true,
        collapseWhitespace: true,
        removeComments: true,
        removeTagWhitespace: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
      },
      // hash: true,
      // excludeChunks:['contact'],
      chunks: ['manifest', 'vendor', 'app'],
      // chunks:['vendor','app'],
      template: './src/index.ejs', // Load a custom template (ejs by default see the FAQ for details)
    }),
    // new webpack.HotModuleReplacementPlugin(),
  ],
};
