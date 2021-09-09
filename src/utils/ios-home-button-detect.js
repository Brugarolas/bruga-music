/**
 * List of devices with physical home button
 *
 * https://ios-resolution.com/
 * https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions
 */
const HOME_BUTTON_DEVICES = [
  {
    name: 'iphone_6+/iphone_6s+/iphone_7+/iphone_8+',
    height: 736,
    width: 414,
    density: 3
  },
  {
    name: 'iphone_6/iphone_6s/iphone_7/iphone_8/iphone_SE_2020',
    height: 667,
    width: 375,
    density: 2
  },
  {
    name: 'iphone_5/iphone_5s/iphone_5c/iphone_SE_2016',
    height: 568,
    width: 320,
    density: 2
  },
  {
    name: 'iphone_4/iphone_4s',
    height: 480,
    width: 320,
    density: 2
  }
]

/**
 * Detect manually if device has a physical home button to update viewport safe
 * height accordingly.
 *
 * We need this because safe-area-inset-* is always 0 if address bar & tool bar
 * do not collapse, which does not happen in our app as our scrolling element is
 * .scrolling-element instead of <html> or <body>.
 *
 * Source of how to prevent address bar & tool bar to collapse:
 * https://greensock.com/forums/topic/24315-prevent-address-bar-from-hiding-on-mobile-scroll-trigger/
 *
 * We can check safe-area behaviour here:
 * https://codesandbox.io/s/984z59pnxo
 *
 */
export default function () {
  const { height, width } = window.screen;
  const density = window.devicePixelRatio;

  const device = HOME_BUTTON_DEVICES.find(device => {
    return device.height === height && device.width === width && device.density === density;
  });

  const hasHomeButton = Boolean(device);

  if (!hasHomeButton) {
    const body = document.body || document.querySelector('body');

    body.setAttribute('data-notch', 'true');
  }

  return hasHomeButton;
}
