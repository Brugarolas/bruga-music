module.exports = {
  presets: [
    ['@babel/env', { targets: { browsers: ['> 1%', 'last 2 versions', 'not ie <= 11', 'not dead'] }, useBuiltIns: false, modules: false }]
  ],
  plugins: [
    ['@babel/transform-runtime', { corejs: 3 }]
  ]
};
