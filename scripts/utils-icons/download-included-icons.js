const fs = require('fs');
const puppeteer = require('puppeteer');
const chunk = require('lodash/chunk');
const { getIconFileDataFromURL } = require('./download-icon-utils.js');
const includedIcons = require('./included-icons.json');
const { addIconToProject } = require('./download-fa-icon.js');

// Probably can get a lot higher before it starts to fail, but it's better to be conservative
const MAX_CONCURRENCY = 8;

// Loop over an array of icon URLs and check if they exists in our project
const iconsToDownload = includedIcons.filter(iconUrl => {
  // Guess icon file name from URL
  const iconData = getIconFileDataFromURL(iconUrl);

  return !fs.existsSync(iconData.path);
});

// Download icons that don't exist
const downloadIcons = async (icons) => {
  // Create reusable browser instance
  const browser = await puppeteer.launch({
    headless: true
  });

  // Run in parallel using a promise pool and the same browser instance,
  // to avoid memory leaks and too many Puppeteer/Chrome threads
  const iconChunks = chunk(icons, MAX_CONCURRENCY);

  for (let i = 0; i < iconChunks.length; i++) {
    await Promise.all(iconChunks[i].map(icon => addIconToProject(icon, browser, false)));
  }

  // Close browser on end
  await browser.close();

  console.log('Included icons have been updated!\n'); // eslint-disable-line no-console
};

if (!iconsToDownload.length) {
  console.log('No new icons to add!\n'); // eslint-disable-line no-console
} else {
  downloadIcons(iconsToDownload);
}

export default () => {
  if (!iconsToDownload.length) {
    console.log('No new icons to add!\n'); // eslint-disable-line no-console
  } else {
    downloadIcons(iconsToDownload);
  }
};
