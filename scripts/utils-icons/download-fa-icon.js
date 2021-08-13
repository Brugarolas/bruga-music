const puppeteer = require('puppeteer');
const { optimize } = require('svgo');
const { getIconFileDataFromURL } = require('./download-icon-utils.js');
const fs = require('fs');
const path = require('path');

/**
 * Method that uses Puppeteer to download element from remote page,
 * using an existing Puppeteer and Chrome instance.
 *
 * @param {String} url URL
 * @param {String} selector HTML selector
 * @param {Object} browser Puppeteer browser instance
 * @param {Boolean} closePage Wether to close page at the end or not
 * @returns {String} Selector outer HTML content
 */
const downloadElementFromPage = async (url, selector, browser, closePage = true) => {
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: 'networkidle2'
  });

  await page.waitForSelector(selector, {
    visible: true,
    timeout: 60000
  });

  const selectedElement = await page.$(selector);
  const elementHtml = await page.evaluate((element) => element.outerHTML, selectedElement);
  await selectedElement.dispose();

  if (closePage) {
    await page.close();
  }

  return elementHtml;
};

/**
 * Method that uses Puppeteer to download element from remote page,
 * using a single thread and creating a new Puppeteer and Chrome instance
 * and closing it at the end.
 *
 * @param {String} url URL
 * @param {String} selector HTML selector
 * @returns {String} Selector outer HTML content
 */
const downloadElementFromPageNewInstance = async (url, selector) => {
  const browser = await puppeteer.launch({
    headless: true
  });

  const elementHtml = await downloadElementFromPage(url, selector, browser, false);

  await browser.close();

  return elementHtml;
};

/**
 * Method that uses SVGO to optimize a SVG, removing redundant and useless information
 *
 * @param {String} svgString SVG to optimize
 * @returns {String} Optimized SVG
 */
const optimizeSvg = (svgString) => {
  const result = optimize(svgString, {
    multipass: true,
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false
          }
        }
      },

      {
        name: 'removeAttrs',
        params: {
          attrs: '(class|focusable|aria-hidden|data-prefix|data-icon)'
        }
      },

      {
        name: 'removeDimensions'
      }
    ]
  });

  return result.data;
};

/**
 * Method that writes string content into a specified file path, overriding file it if already exists
 *
 * @param {String} filePath Path of the file
 * @param {String} stringContent Content of the file
 * @returns {Promise} Promise what will be resolved when file is written, or will throw an error if it could not
 */
const saveFile = (filePath, stringContent) => {
  return new Promise((resolve) => {
    fs.writeFile(filePath, stringContent, { encoding: 'utf8', flag: 'w' }, (error) => {
      if (error) throw error;

      resolve({ filePath, stringContent });
    });
  });
};

/**
 * Method that persists new added URL in JSON file if it does not exist before
 *
 * @param {String} url New URL to persist in file
 * @param {String} filePath File path of JSON to update with new URL
 */
const persistUrl = (url, filePath = './included-icons.json') => {
  try {
    const urls = require(filePath);

    if (urls.includes(url)) {
      return;
    }

    urls.push(url);

    const jsonPath = path.resolve(__dirname, filePath);
    const jsonContent = JSON.stringify(urls.sort(), null, '\t');

    fs.writeFileSync(jsonPath, jsonContent);

    console.log(`Updated ${filePath} file with new URL ${url}`); // eslint-disable-line no-console
  } catch (error) {
    console.log(`Could not persist ${url} URL in ${filePath} file`, error); // eslint-disable-line no-console
  }
};

/**
 * All the magic happens here!
 * Download SVG from Font Awesome URL, optimizes it, and saves it in our project
 *
 * @param {String} faURL Font Awesome icon URL
 * @param {Object} browser (Optional) Puppeteer and Chrome existing instance, allows to save CPU and memory
 * @param {Boolean} persist (Optional) Add URL to included-icons.json file, default will be true
 * @returns {Promise} Promise what will be resolved when file is written
 */
const addIconToProject = async (faURL, browser, persist = true) => {
  // Guess icon file name from URL
  const iconData = getIconFileDataFromURL(faURL);

  // Download element promise, creating a new browser instance if necessary
  const downloadElementPromise = browser
    ? downloadElementFromPage(faURL, iconData.selector, browser, true)
    : downloadElementFromPageNewInstance(faURL, iconData.selector);

  // Download, optimize and save SVG
  return downloadElementPromise.then(
    svgString => optimizeSvg(svgString)
  ).then(
    svgString => saveFile(iconData.path, svgString)
  ).then(() => {
    if (persist) {
      persistUrl(faURL);
    }

    console.log(`Successfully added ${iconData.name} icon to project!\n`); // eslint-disable-line no-console
  }).catch(error => {
    console.error(error); // eslint-disable-line no-console
  });
};

// Otherwise, export method
module.exports = {
  addIconToProject
};
