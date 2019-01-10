import Vue from 'vue';
import Vuex from 'vuex';
import LastFM from '@/api/lastfm/vue-plugin.js';
import YouTube from '@/api/youtube/vue-plugin.js';

Vue.use(Vuex);

Vue.use(YouTube);
Vuex.Store.prototype.$youtube = Vue.prototype.$youtube;

Vue.use(LastFM);
Vuex.Store.prototype.$lastfm = Vue.prototype.$lastfm;

const store = new Vuex.Store({
  state: {
    count: 0,
    song: {
      basic: { },
      meta: { },
      youtube: { }
    }
  },
  getters: {
    hasSong (state) {
      return state.song.youtube && state.song.youtube.youtubeId;
    },
    playing (state) {
      return state.song.youtube;
    },
    imagePlaying (state) {
      if (state.song.basic.image === undefined) return '';

      return state.song.basic.image === '' ? state.song.youtube.thumbnail : state.song.basic.image;
    }
  },
  mutations: {
    setSongBasicData (state, basic = {}) {
      state.song.basic = basic;
    },
    setSongMetaData (state, meta = {}) {
      state.song.meta = meta;
    },
    setSongYouTube (state, youtube = {}) {
      state.song.youtube = youtube;
    }
  },
  actions: {
    playSong (context, song) {
      let { artist, track, image } = song;

      context.commit('setSongBasicData', { artist, track, image });

      this.$lastfm.getTrackInfo(artist, track).then((trackInfo) => {
        context.commit('setSongMetaData', trackInfo);
      });

      let query = buildSearchQuery(artist, track);

      this.$youtube.search(query).then(results => {
        var youtubeId = results[0].id.videoId;
        var thumbnail = results[0].snippet.thumbnails.high.url;
        context.commit('setSongYouTube', { artist, track, youtubeId, thumbnail });
      });
    }
  }
});

const buildSearchQuery = (artist, track) => {
  let aux = artist.toLowerCase();
  if (aux === '[unknown]' || track.toLowerCase().includes(aux)) artist = '';

  return `${artist} ${track}`;
};

export default store;
