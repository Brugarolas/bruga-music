// https://gist.github.com/lchanouha/06b51423bc60693af216ebdce37d86a8
// ==UserScript==
// @name         Disable Page Visibility API
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Disables JS events on whole page focus/unfocus. Usefull to prevent ads stop when switching to another tab.
// @author       Louis Chanouha
// @match        *://*/*
// @grant        none
// ==/UserScript==

// Sourced from: https://stackoverflow.com/questions/47660653/chrome-extension-how-to-disable-page-visibility-api
// Tested on Google Chrome 64 / Tampermonkey (24/03/2018)
const disablePageVisibility = () => {
  for (const eventName of ['visibilitychange', 'webkitvisibilitychange', 'blur']) {
    window.addEventListener(eventName, function (event) {
      console.log('Page visibility', event);

      event.stopImmediatePropagation();
      event.preventDefault();
    }, true);
  }
};

export default disablePageVisibility;
