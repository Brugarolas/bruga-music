const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const { GenerateSW } = require('workbox-webpack-plugin');
const { DefinePlugin } = webpack;

const { NODE_ENV, PUBLIC_PATH, ANALYZER, LOCAL } = process.env;
const isProduction = NODE_ENV === 'production';
const isLocal = !isProduction && Boolean(LOCAL);
const isAnalyzer = isProduction && Boolean(ANALYZER);
const publicPath = isProduction ? '/' + (PUBLIC_PATH ? PUBLIC_PATH + '/' : '') : '/';

const babelTargets = ['> 1%', 'last 2 versions', 'not ie <= 11', 'not dead'];

module.exports = {
  entry: './src/index.js',
  mode: 'development',
  stats: {
    assets: true,
    children: false,
    colors: true
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: publicPath,
    filename: 'js/bundle.js?[contenthash]'
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                paths: [path.resolve(__dirname, 'node_modules')]
              }
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
            ['@babel/env', { targets: { browsers: babelTargets }, useBuiltIns: false, modules: false }]
          ],
          plugins: [
            ['@babel/transform-runtime', { corejs: 3 }]
          ]
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            // https://github.com/webpack-contrib/html-loader/issues/291
            preprocessor: (content, loaderContext) => {
              const loadFile = (m, src) => fs.readFileSync(path.resolve(loaderContext.context, src), 'utf8');

              return content.replace(/<include src="(.+)"\/?>(?:<\/include>)?/gi, loadFile);
            }
          }
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[contenthash]',
          outputPath: 'img'
        }
      },
      {
        test: /\.(woff|woff2|ttf|eot|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[contenthash]',
          outputPath: 'fonts'
        }
      }
    ]
  },
  plugins: [
    new DefinePlugin({
      PUBLIC_PATH: JSON.stringify(PUBLIC_PATH ? `/${PUBLIC_PATH}/` : '/')
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles/bundle.css?[contenthash]'
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      favicon: './src/assets/logo.png',
      meta: {
        viewport: 'width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover'
      },
      scriptLoading: 'defer',
      inject: 'body'
    }),
    new WebpackPwaManifest({
      name: 'Bruga Music',
      orientation: 'portrait',
      display: 'standalone',
      start_url: '.',
      short_name: 'Bruga Music',
      description: 'Music app made with Vue, Vuex and Vue Router ',
      background_color: '#d45534',
      theme_color: '#7a3368',
      inject: true,
      fingerprints: false,
      ios: true,
      publicPath,
      icons: [{
        src: path.resolve('src/assets/logo.png'),
        sizes: [36, 48, 72, 96, 144, 192, 256],
        destination: path.join('icons', 'ios'),
        ios: true
      }, {
        src: path.resolve('src/assets/logo.png'),
        size: 256,
        destination: path.join('icons', 'ios'),
        ios: 'startup'
      }, {
        src: path.resolve('src/assets/logo.png'),
        sizes: [36, 48, 72, 96, 144, 192, 256],
        destination: path.join('icons', 'android')
      }]
    }),
    new GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      babelPresetEnvTargets: babelTargets,
      cleanupOutdatedCaches: true,
      sourcemap: false,
      inlineWorkboxRuntime: true,
      swDest: '/js/service-worker.js',
      include: [/\.html$/, /\.js$/, /\.css$/, /\.jpg$/, /\.png$/, /\.ico$/, /\.woff$/, /\.woff2$/, /\.ttf$/, /\.eot$/, /\.svg$/]
    })
  ],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 8080,
    hot: true,
    open: true,
    host: isLocal ? '0.0.0.0' : 'localhost',
    useLocalIp: isLocal,
    disableHostCheck: true // for ngrok
  },
  performance: {
    hints: false
  },
  devtool: 'eval-source-map'
};

if (isProduction) {
  module.exports.mode = 'production';

  // Add babel-minify preset only in production
  const babelRules = module.exports.module.rules.find(rule => rule.loader === 'babel-loader');
  babelRules.options.presets.unshift(['minify', { builtIns: false }]);
}

if (isAnalyzer) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
  module.exports.plugins.push(new BundleAnalyzerPlugin());
  module.exports.devtool = false;
}

if (publicPath !== '/') {
  module.exports.devtool = false;
}
