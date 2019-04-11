import Vuex from 'vuex';
import './initialize.js';

const store = new Vuex.Store({
  state: {
    playing: 0,
    songs: []
  },
  getters: {
    hasSong (state) {
      return state.songs && state.songs.length > 0;
    },
    hasPrevSong (state) {
      return state.playing > 0;
    },
    hasNextSong (state) {
      const playingSong = state.playing + 1;
      const maxSong = state.songs.length;

      return playingSong < maxSong;
    },
    searchSongByNameAndArtist (state) {
      return (name, artist) => state.songs.find(song => song.track === name && song.artist === artist);
    },
    searchSongIndexByNameAndArtist (state) {
      return (name, artist) => state.songs.findIndex(song => song.track === name && song.artist === artist);
    },
    searchSongByYoutubeId (state) {
      return (youtubeId) => state.songs.find(song => song.youtubeId === youtubeId);
    },
    searchSongIndexByYoutubeId (state) {
      return (youtubeId) => state.songs.findIndex(song => song.youtubeId === youtubeId);
    },
    playlist (state) {
      return state.songs;
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
    removeSong (state, index) {
      if (index === state.playing && state.playing > 0) {
        state.playing--;
      }
      state.songs.splice(index, 1);
    },
    prevSong (state) {
      state.playing--;
    },
    nextSong (state) {
      state.playing++;
    },
    playSong (state, num) {
      state.playing = num;
    }
  },
  actions: {
    addOrPlaySong (context, { artist, track, image }) {
      if (context.getters.searchSongByNameAndArtist(track, artist)) {
        return;
      }

      const query = buildSearchQuery(artist, track);

      this.$youtube.search(query).then(results => {
        const youtubeId = results[0].id.videoId;
        const thumbnail = results[0].snippet.thumbnails.high.url;

        context.commit('addSong', { artist, track, image, youtubeId, thumbnail });
      });
    },
    changePlayingSong (context, { artist, track, youtubeId }) {
      const index = youtubeId
        ? context.getters.searchSongIndexByYoutubeId(youtubeId)
        : context.getters.searchSongIndexByNameAndArtist(track, artist);

      if (index !== -1) {
        context.commit('playSong', index);
      }
    },
    deleteSong (context, { artist, track, youtubeId }) {
      const index = youtubeId
        ? context.getters.searchSongIndexByYoutubeId(youtubeId)
        : context.getters.searchSongIndexByNameAndArtist(track, artist);

      if (index !== -1) {
        context.commit('removeSong', index);
      }
    },
    playPrevSong (context) {
      if (context.getters.hasPrevSong) {
        context.commit('prevSong');
      }
    },
    playNextSong (context) {
      if (context.getters.hasNextSong) {
        context.commit('nextSong');
      }
    }
  }
});

const buildSearchQuery = (artist, track) => {
  let aux = artist.toLowerCase();
  if (aux === '[unknown]' || track.toLowerCase().includes(aux)) artist = '';

  return `${artist} ${track}`;
};

export default store;
