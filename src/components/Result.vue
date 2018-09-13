<template>
  <div class="results-wrapper">
    <h2 style="text-transform: capitalize;">{{ type }}s</h2>
    <Spinner v-if="loading" />

    <ul v-if="isArtist" class="artist-list">
      <li v-for="artist in artists" :key="artist.mbid" class="artist-wrapper">
        <Artist :artist="artist" />
      </li>
    </ul>

    <ul v-if="isAlbum" class="album-list">
      <li v-for="album in albums" :key="album.id" class="album-wrapper">
        <Album :album="album" />
      </li>
    </ul>

    <ul v-if="isTrack" class="track-list">
      <li v-for="track in tracks" :key="track.mbid" class="track-wrapper">
        <Song :track="track" />
      </li>
    </ul>
  </div>
</template>

<script>
import Spinner from './Spinner.vue';
import Artist from './Artist.vue';
import Song from './Song.vue';
import Album from './Album.vue';

export default {
  name: 'Result',
  components: {
    Spinner, Artist, Album, Song
  },
  props: {
    results: {
      type: Array,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isArtist () {
      return this.type === 'artist';
    },
    isAlbum () {
      return this.type === 'album';
    },
    isTrack () {
      return this.type === 'track';
    },
    artists () {
      return this.isArtist ? this.results : [];
    },
    tracks () {
      return this.isTrack ? this.results : [];
    },
    albums () {
      return this.isAlbum ? this.results : [];
    }
  }
};
</script>

<style lang="less">
.results-wrapper {
  display: block;
  position: relative;
}
.track-wrapper {
  display: block;
  margin: 0;
  padding: 0 10px;
  width: 100%;
  box-sizing: border-box;
}
</style>
