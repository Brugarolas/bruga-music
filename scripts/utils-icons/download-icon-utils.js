const path = require('path');

const FONT_SVGS_PATH = '../../src/assets/svgs/font/';

/**
 * Get icon file data from URL
 *
 * @param {String} faUrl Font Awesome icon URL
 * @returns {Object} Object with name, selector and SVG path of the icon
 */
const getIconFileDataFromURL = (faUrl) => {
  const splitUrl = faUrl.split('/');
  const iconModel = splitUrl[splitUrl.length - 1];

  const [name, style] = iconModel.split('?style=');
  const iconName = `${name}-${style}`;
  const iconPath = `${FONT_SVGS_PATH}${iconName}.svg`;

  return {
    name: iconName,
    selector: `.svg-inline--fa.fa-2x.fa-${name}`,
    path: path.resolve(__dirname, iconPath)
  };
};

module.exports = {
  getIconFileDataFromURL
};
