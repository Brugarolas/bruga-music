const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/main.js'],
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          'vue-style-loader',
          'css-loader',
          'less-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        exclude: /node_modules/,
        options: {
          loaders: { // other vue-loader options go here
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            'minify',
            [ '@babel/env', { 'targets': { 'browsers': [ 'last 2 versions' ] }, 'modules': false } ]
          ],
          plugins: [
            // Stage 0
            '@babel/plugin-proposal-function-bind',

            // Stage 1
            // "@babel/plugin-proposal-export-default-from",
            '@babel/plugin-proposal-logical-assignment-operators',
            ['@babel/plugin-proposal-optional-chaining', { 'loose': false }],
            ['@babel/plugin-proposal-pipeline-operator', { 'proposal': 'minimal' }],
            ['@babel/plugin-proposal-nullish-coalescing-operator', { 'loose': false }],
            '@babel/plugin-proposal-do-expressions',

            // Stage 2
            ['@babel/plugin-proposal-decorators', { 'legacy': true }],
            // "@babel/plugin-proposal-function-sent",
            // "@babel/plugin-proposal-export-namespace-from",
            // "@babel/plugin-proposal-numeric-separator",
            '@babel/plugin-proposal-throw-expressions',

            // Stage 3
            // "@babel/plugin-syntax-dynamic-import",
            // "@babel/plugin-syntax-import-meta",
            ['@babel/plugin-proposal-class-properties', { 'loose': false }]
            // "@babel/plugin-proposal-json-strings"
          ]
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
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

if (process.env.NODE_ENV === 'production') { // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.devtool = '#source-map';
  module.exports.mode = 'production';
}
