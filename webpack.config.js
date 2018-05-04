const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LessThemePlugin = require('webpack-less-theme-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  // devtool: 'eval',
  entry: {
    app: ['react-hot-loader/patch', 'babel-polyfill', './src/index.js'],
    // vendor: ['react', 'react-dom'], //分离第三方库
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // 以保证 hot reloading 会在嵌套的路由有效。
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
    modules: [path.resolve(__dirname, 'node_modules')], // 优化webpack文件搜索范围
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx', '.less'],
    alias: {
      component: path.resolve(__dirname, './src/component'),
      store: path.resolve(__dirname, './src/store'),
      css: path.resolve(__dirname, './src/assets/css'),
      util: path.resolve(__dirname, './src/util'),
      config: path.resolve(__dirname, './config.js'),
      Loading: path.resolve(__dirname, './src/component/common/Loading.js'),
      Action: path.resolve(__dirname, './src/component/common/Action.js'),
      Axios: path.resolve(__dirname, './src/util/axios.js'),
      MainHeader: path.resolve(__dirname, './src/component/common/MainHeader.js'),
      Header: path.resolve(__dirname, './src/component/common/Header.js'),
      Spin: path.resolve(__dirname, './src/component/common/Spin.js'),
      AppState: path.resolve(__dirname, './src/store/AppState.js'),
      CheckPermission: path.resolve(__dirname, './src/component/common/CheckPermission.js'),
      Constants: path.resolve(__dirname, './src/util/Constants.js'),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          }, 
          {
            loader: 'postcss-loader',
          },
        ],
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
              sourceMap: process.env.NODE_ENV !== 'production',
            },
          },
        ],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          query: {
            plugins: [['import', { libraryName: 'antd', style: true }]], // style: true 会加载 less 文件 style: 'css' 会加载 css 文件
          },
        }, {
          loader: 'eslint-loader',
        },
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
    host: '0.0.0.0', // 允许局域网通过ip访问
    public: 'localhost:3000', // 加了host之后，open会打开0.0.0.0，所以需要定义public
    stats: 'errors-only',
    open: true,
    proxy: {
      // /api/test => http://localhost:8000/test
      '/**': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },
  plugins: [
    new LessThemePlugin({ theme: './theme.less' }), // 使antd主题可以热加载
    new ExtractTextPlugin('styles.css'),
    new CommonsChunkPlugin({
      names: ['vendor', 'manifest'], // name是提取公共代码块后js文件的名字。
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
