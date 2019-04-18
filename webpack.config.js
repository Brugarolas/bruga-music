const { DefinePlugin } = require('webpack');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoteFilePlugin = require('remote-file-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackIncludeAssetsPlugin = require('html-webpack-include-assets-plugin');

const { NODE_ENV, PUBLIC_PATH } = process.env;
const isProduction = NODE_ENV === 'production';
const publicPath = isProduction ? '/' + (PUBLIC_PATH ? PUBLIC_PATH + '/' : '') : '/';

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  stats: { children: false },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: publicPath,
    filename: 'js/bundle.js?[hash]'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader',
            options: {
              paths: [ path.resolve(__dirname, 'node_modules') ]
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: { /* other vue-loader options go here */ }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [ '@babel/env', { targets: { browsers: [ 'last 2 versions' ] }, useBuiltIns: 'usage', corejs: 3, modules: false } ]
          ],
          plugins: [
            [ '@babel/transform-runtime', { corejs: 3 } ]
          ]
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            interpolate: true,
            attrs: []
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          outputPath: 'img'
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]',
          outputPath: 'fonts'
        }
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      'PUBLIC_PATH': JSON.stringify(PUBLIC_PATH ? `/${PUBLIC_PATH}/` : '/')
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/bundle.css?[hash]'
    }),
    new RemoteFilePlugin([
      {
        url: 'https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800|Roboto:100,300,400,500,700,900',
        filepath: 'styles/fonts.css',
        cache: true
      }
    ]),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: './src/assets/logo.png',
      meta: {
        viewport: 'width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no'
      },
      inject: true
    }),
    new HtmlWebpackIncludeAssetsPlugin({
      assets: ['styles/fonts.css'],
      resolvePaths: true,
      publicPath: true,
      append: true,
      hash: true
    })
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
};

if (isProduction) {
  module.exports.devtool = '#source-map';
  module.exports.mode = 'production';

  // Add babel-minify preset only in production
  const babelRules = module.exports.module.rules.find(rule => rule.loader === 'babel-loader');
  babelRules.options.presets.unshift([ 'minify', { builtIns: false } ]);
}

if (publicPath !== '/') {
  module.exports.devtool = '';
}
