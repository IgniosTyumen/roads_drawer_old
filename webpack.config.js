const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'production';
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Dotenv = require('dotenv-webpack');

const LIB_STYLES = /(react-calendar|react-tabs|slick|slick-theme|global).css/;

module.exports = {
  mode: 'development',
  entry: ['babel-polyfill','./index.js'],
  context: path.join(__dirname,'src'),
  output: {
    publicPath: '/dist/',
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            babelrc: false,
            presets: [
              ["@babel/env", {
                "targets": {
                  'browsers': ['Chrome >=59']
                },
                "modules":false,
                "loose":true
              }],"@babel/react"],

            plugins: [
              "react-hot-loader/babel",
              "@babel/plugin-proposal-class-properties",
              ["import", {libraryName: "antd", style: "css"}],
              "@babel/proposal-object-rest-spread"

            ]
          }
        }
        ]
      },
      {
        test: LIB_STYLES,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.css/,
        exclude: LIB_STYLES,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              minimize: true,
              modules: true,
              importLoaders: 1,
              localIdentName: '[name]__[local]--[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          devMode ? 'file-loader' : 'file-loader?name=[name].[ext]&publicPath=/static/roads-state/dist/'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
            loader: 'file-loader',
            options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
            }
        }]
      }
    ]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    // new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new Dotenv(),
  ],
  optimization: {

  },
  devtool: devMode ? 'eval-source-map' : false,
  devServer: {
    host: '0.0.0.0',
    // hot: true,
    historyApiFallback: true,
    open: true,
    port: 9000,
    disableHostCheck: true,
    proxy: {
     '/weight_control/*' : {
        target: 'https://av.admtyumen.ru/api/',
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          '^/media/': ''
        }
      }
    }
  }
}
