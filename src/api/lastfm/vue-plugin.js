import lastFM from './services.js';

/* Public API */

const LastFM = {};

LastFM.install = (Vue, options) => {
  Vue.prototype.$lastfm = lastFM;
};

export default LastFM;
