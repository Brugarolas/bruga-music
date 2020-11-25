/*
  YouTube Player API (YAPI): https://developers.google.com/youtube/iframe_api_reference
  Check https://www.youtube.com/iframe_api for more updated API
  Revision History: https://developers.google.com/youtube/v3/revision_history
*/

/* Own Player Loader */
let widgetPlayer;

const loadYoutubePlayerWidget = () => {
  return new Promise((resolve, reject) => {
    if (widgetPlayer) {
      return resolve(widgetPlayer);
    }

    initYouTubeAPI();

    window.onYouTubeIframeAPIReady = function () {
      const player = new window.YT.Player('ytPlayer', {
        // videoId: 'M7lc1UVf-VE',
        host: 'https://www.youtube.com',
        height: '360',
        width: '640',
        playerVars: {
          rel: 0,
          showinfo: 0,
          autoplay: 0,
          controls: 1
        }
      });

      player.addEventListener('onReady', (event) => {
        widgetPlayer = event.target;

        resolve(event.target);
      });
    };
  });
};

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
    for (const property in newConfiguration) {
      if (newConfiguration.hasOwnProperty(property)) {
        configStore[property] = newConfiguration[property];
      }
    }
  };
};

const getCurrentNonce = () => {
  const current = document.currentScript;

  return current ? current.nonce || current.getAttribute('nonce') : undefined;
};

const loadScript = (attributes) => {
  const newScript = document.createElement('script');

  for (const attribute in attributes) {
    if (attributes[attribute]) {
      newScript[attribute] = attributes[attribute];
    }
  }

  const firstScript = document.getElementsByTagName('script')[0];
  firstScript.parentNode.insertBefore(newScript, firstScript);
};

/* Google Rewrite */
window.YT = window.YT || { loading: 0, loaded: 0 };
window.YTConfig = window.YTConfig || { host: 'https://www.youtube.com' };

const loadYouTubeWidgetPlayer = () => {
  const asyncFunctionality = [() => { window.YT.loaded = 1; }];

  window.YT.ready = deferExecution(() => window.YT.loaded, asyncFunctionality);
  window.onYTReady = executeFunctions(asyncFunctionality);

  window.YT.setConfig = createConfigurator(window.YTConfig);

  loadScript({
    type: 'text/javascript',
    id: 'www-widgetapi-script',
    src: 'https://www.youtube.com/s//player/77da52cd/www-widgetapi.vflset/www-widgetapi.js',
    async: true,
    nonce: getCurrentNonce()
  });
};

const initYouTubeAPI = () => {
  if (!window.YT.loading) {
    window.YT.loading = 1;
    loadYouTubeWidgetPlayer();
  }
};

// Exports
export default loadYoutubePlayerWidget;
