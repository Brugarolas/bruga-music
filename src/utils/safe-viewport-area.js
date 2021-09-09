import { detectMobileDevice, MOBILE_DEVICES } from './detect-mobile-devices';
import homeButtonDetect from './ios-home-button-detect';

const SAFE_AREA_INSET = {
  ANDROID: 56,
  IOS: 114,
  IOS_HOME_BUTTON: 40
};

/**
 * Fix for iOS
 * When iOS is hides address bar and bottom navigation bar, we don't need a secure padding-bottom
 * That normally happens when user goes to landscape mode, and then to portrait mode again
 */
function changeSafeViewportWhenFullscreenChanges () {
  const body = document.body || document.querySelector('body');
  const initialHeight = window.outerHeight;
  let isFullscreenMode = false;

  window.addEventListener('resize', function (event) {
    const _isFullscreenMode = initialHeight > event.target.outerHeight;

    if (isFullscreenMode !== _isFullscreenMode) {
      isFullscreenMode = _isFullscreenMode;
    }

    if (isFullscreenMode) {
      body.style.setProperty('--viewport-height', '0px');
    } else {
      body.style.setProperty('--viewport-height', `${SAFE_AREA_INSET.IOS}px`);
    }
  });
}

/**
 * Set safe viewport height size only in Android and iOS for CSS .full-height-viewport-mobile class
 */
export default function () {
  const device = detectMobileDevice();

  // We don't need safe area paddings for desktop
  if (!device) {
    return;
  }

  const body = document.body || document.querySelector('body');

  // For Android we need to set a padding-bottom of 56px for top navigation bar https://dev.to/peiche/100vh-behavior-on-chrome-2hm8
  if (device === MOBILE_DEVICES.ANDROID) {
    body.style.setProperty('--viewport-height', `${SAFE_AREA_INSET.ANDROID}px`);
  }

  // For iOS we need to set a secure padding-bottom for address bar and bottom navigation bar (74px for home button devices, 114px otherwise)
  if (device === MOBILE_DEVICES.IOS) {
    const hasHomeButton = homeButtonDetect();

    if (hasHomeButton) {
      SAFE_AREA_INSET.IOS -= SAFE_AREA_INSET.IOS_HOME_BUTTON;
    }

    body.style.setProperty('--viewport-height', `${SAFE_AREA_INSET.IOS}px`);

    changeSafeViewportWhenFullscreenChanges();
  }
}
