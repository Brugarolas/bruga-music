import Vuex from 'vuex';
import './initialize.js';

const store = new Vuex.Store({
  state: {
    playing: 0,
    songs: []
  },
  getters: {
    hasSong (state) {
      return state.songs && state.songs.length;
    },
    hasPrevSong (state) {
      return state.playing > 0;
    },
    hasNextSong (state) {
      const playingSong = state.playing + 1;
      const maxSong = state.songs.length;

      return playingSong < maxSong;
    },
    playlistStatus (state) {
      const actualSong = state.playing + 1;
      const numSongs = state.songs.length;

      return `${actualSong} / ${numSongs}`;
    },
    playing (state) {
      return state.songs[state.playing] || {};
    },
    imagePlaying (state) {
      const playing = store.getters.playing;

      return playing ? playing.image || playing.thumbnail || '' : '';
    }
  },
  mutations: {
    addSong (state, song) {
      state.songs.push(song);
    },
    prevSong (state) {
      if (store.getters.hasPrevSong) {
        state.playing--;
      }
    },
    nextSong (state) {
      if (store.getters.hasNextSong) {
        state.playing++;
      }
    }
  },
  actions: {
    playSong (context, { artist, track, image }) {
      const query = buildSearchQuery(artist, track);

      this.$youtube.search(query).then(results => {
        const youtubeId = results[0].id.videoId;
        const thumbnail = results[0].snippet.thumbnails.high.url;

        context.commit('addSong', { artist, track, image, youtubeId, thumbnail });
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
