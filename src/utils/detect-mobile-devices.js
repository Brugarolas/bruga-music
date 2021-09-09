export const MobileDevices = {
  IOS: Symbol('ios'),
  ANDROID: Symbol('android')
};

/**
 * Detects if it is a mobile device
 *
 * @returns {String} Whether is Android ("android"), iOS ("ios"), or not a mobile device (undefined)
 */
export function detectMobileDevice () {
  // If it has only one max touch point, it is not a mobile device, we are emulating it with Chrome responsive mode
  if (window.navigator.maxTouchPoints <= 1) {
    return;
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  const body = document.body || document.querySelector('body');

  if (userAgent.includes('android')) {
    return MobileDevices.ANDROID;
  }

  if (userAgent.includes('iphone')) {
    body.classList.add('ios'); // For iOS specifics fixes

    return MobileDevices.IOS;
  }
}

export default { detectMobileDevice, MobileDevices };
