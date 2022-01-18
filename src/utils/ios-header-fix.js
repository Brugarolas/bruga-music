import { detectMobileDevice, MOBILE_DEVICES } from './detect-mobile-devices';

const device = detectMobileDevice();

/**
 * High-order function that receives a condition and a function you want to execute if that condition is met.
 * If condition is met, it returns function passed as parameter.
 * Otherwise, it returns and empty function that does nothing (to avoid "is not defined"/"is not a function" errors).
 *
 * @param {Boolean} condition Condition to check
 * @param {Function} func Function to execute
 * @returns Function passed as param if condition is met, otherwise an empty function
 */
function conditionalFunction (condition, func) {
  if (condition) {
    return func;
  }

  return () => {};
}

/**
 * Fix for a bug on iPhone
 *
 * When keyboards open, browser scrolls to position the input at the center of the screen
 * but for weird some reason, that pushes fixed elements (or elements outside scrolling layer) like headers or footers outside the viewport,
 * so they are not visible even when the virtual keyboard closes.
 *
 * There is a list of hacks to prevent that:
 * https://medium.com/@im_rahul/safari-and-position-fixed-978122be5f29
 * https://stackoverflow.com/questions/53412139/header-or-footer-hidden-when-open-the-keyboard-in-ios-using-ionic3
 * https://dansajin.com/2017/02/17/ios-safari-fix-for-form-elements-inside-position-fixed-divs-receiving-input/
 * https://blog.opendigerati.com/the-eccentric-ways-of-ios-safari-with-the-keyboard-b5aa3f34228d
 *
 * I have chosen the most simple solution: make header visible again scrolling into viewport again.
 * It won't break current scroll position as scrolling element is the one with .scrolling-element class.
 */
function _makeHeaderVisible () {
  const element = document.querySelector('.scroll--fix-ios');
  window.scrollTo(0, 0);

  if (element) {
    element.scrollIntoViewIfNeeded();
  }
}

/**
 * Detect when keyboard closes so we can apply the fix
 *
 * Source: https://stackoverflow.com/a/2601085
 */
function _applyFixOnKeyboardClose () {
  document.addEventListener('focusout', makeHeaderVisible);
}

// Only export real functions on iOS
export const makeHeaderVisible = conditionalFunction(device === MOBILE_DEVICES.IOS, _makeHeaderVisible);
export const applyFixOnKeyboardClose = conditionalFunction(device === MOBILE_DEVICES.IOS, _applyFixOnKeyboardClose);

export default { makeHeaderVisible, applyFixOnKeyboardClose };
