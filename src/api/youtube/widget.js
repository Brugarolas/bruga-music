/*
  YouTube Player API (YAPI): https://developers.google.com/youtube/iframe_api_reference
  Check https://www.youtube.com/iframe_api for more updated API
  Revision History: https://developers.google.com/youtube/v3/revision_history
*/

/* Own Player Loader */
const youtubeApiPromise = new Promise((resolve, reject) => {
  window.onYouTubeIframeAPIReady = function () {
    var player = new window.YT.Player('ytPlayer', {
      // videoId: 'M7lc1UVf-VE',
      host: 'https://www.youtube.com',
      height: '360',
      width: '640',
      playerVars: {
        'rel': 0,
        'showinfo': 0,
        'autoplay': 0,
        'controls': 1
      }
    });

    player.addEventListener('onReady', () => { resolve(player); });
  };
});

/* Aux Google Rewrite */
const deferExecution = (isLoaded, functionStore) => {
  return (functionality) => {
    if (isLoaded()) {
      functionality();
    } else {
      functionStore.push(functionality);
    }
  };
};

const executeFunctions = (functionStore) => {
  functionStore.forEach(functionality => {
    try {
      functionality();
    } catch (error) {}
  });
};

const createConfigurator = (configStore) => {
  return (newConfiguration) => {
    for (let property in newConfiguration) {
      if (newConfiguration.hasOwnProperty(property)) {
        configStore[property] = newConfiguration[property];
      }
    }
  };
};

const getCurrentNonce = () => {
  let current = document.currentScript;
  return current ? current.nonce || current.getAttribute('nonce') : undefined;
};

const loadScript = (attributes) => {
  let newScript = document.createElement('script');
  for (let attribute in attributes) {
    if (attributes[attribute]) newScript[attribute] = attributes[attribute];
  }

  let firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(newScript, firstScript);
};

/* Google Rewrite */
window.YT = window.YT || { loading: 0, loaded: 0 };
window.YTConfig = window.YTConfig || { 'host': 'https://www.youtube.com' };

const loadYouTubeWidgetPlayer = () => {
  let asyncFunctionality = [ () => { window.YT.Loaded = 1; } ];
  window.YT.ready = deferExecution(() => window.YT.Loaded, asyncFunctionality);
  window.onYTReady = executeFunctions(asyncFunctionality);

  window.YT.setConfig = createConfigurator(window.YTConfig);

  loadScript({
    type: 'text/javascript',
    id: 'www-widgetapi-script',
    src: 'https://s.ytimg.com/yts/jsbin/www-widgetapi-vflkA4wlR/www-widgetapi.js',
    async: true,
    nonce: getCurrentNonce()
  });
};

if (!window.YT.loading) {
  window.YT.loading = 1;
  loadYouTubeWidgetPlayer();
}

// Exports
export default youtubeApiPromise;
