module.exports = {
  files: [
    './svgs/font/*.svg'
  ],
  fontName: 'bruga-music-font',
  classPrefix: 'bm-icon-',
  baseSelector: '.bm-icon',
  types: ['woff2', 'woff'],
  embed: process.env.NODE_ENV === 'development',
  dest: '/fonts',
  cssDest: '/styles',
  cssTemplate: './bruga-font.css.hbs',
  fileName: '[fontname].[ext]?[chunkhash]'
};
