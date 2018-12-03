import youtube from './api.js';

/* Public API */

const YouTubeSearcher = {};

YouTubeSearcher.install = (Vue, options) => {
  Vue.prototype.$youtube = { };

  Vue.prototype.$youtube.search = youtube.search;

  Vue.prototype.$youtube.player = youtube.player;
};

export default YouTubeSearcher;
