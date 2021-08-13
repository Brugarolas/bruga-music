/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');

const FONT_SVGS_PATH = '../../src/assets/svgs/font/';

const directoryPath = path.join(__dirname, FONT_SVGS_PATH);
fs.readdir(directoryPath, function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }
  files.forEach(function (file) {
    const fileName = file.split('.')[0];
    const fileParts = fileName.split('-');
    const iconName = fileParts.slice(0, -1).join('-');
    const iconSize = fileParts.slice(-1)[0];

    console.log(`"https://fontawesome.com/icons/${iconName}?style=${iconSize}",`);
  });
});
