<template>
  <div class="card card__big margin-top-xxl">
    <Spinner v-if="loading" />

    <h2 v-if="showDefaultSearch" class="search-title default">Showing top {{ type }}s in <Countries @change="changeCountry" /></h2>

    <h2 v-if="!showDefaultSearch" class="search-title">{{ type }}s</h2>

    <ul v-if="isArtist" class="artist-list flex-list">
      <Artist v-for="artist in artists" :key="artist.mbid" :artist="artist" />
    </ul>

    <ul v-if="isAlbum" class="album-list flex-list">
      <Album v-for="album in albums" :key="album.id" :album="album" />
    </ul>

    <ul v-if="isTrack" class="track-list flex-list">
      <li v-for="track in tracks" :key="track.mbid" class="track-wrapper flex-no-borders">
        <Song :track="track" />
      </li>
    </ul>
  </div>
</template>

<script>
import Spinner from './Spinner.vue';
import Countries from '@/components/Countries.vue';
import Artist from './Artist.vue';
import Song from './Song.vue';
import Album from './Album.vue';

export default {
  name: 'Result',
  components: {
    Spinner, Countries, Artist, Album, Song
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
    },
    showDefaultSearch: {
      type: Boolean,
      default: true
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
  },
  methods: {
    changeCountry: function (country) {
      this.$emit('changeCountry', country);
    }
  }
};
</script>

<style lang="less">
.search-title {
  text-transform: capitalize;
  margin-bottom: 0;

  &.default {
    text-transform: none;
    margin-bottom: 0;
    line-height: 90%;
  }
}
.track-wrapper {
  display: block;
  margin: 0;
  padding: 0 10px;
  width: 100%;
  box-sizing: border-box;
}
</style>
