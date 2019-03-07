<template>
  <div v-if="ready" class="top-tracks margin-top-xl">
    <h4 class="title">Popular Tracks</h4>

    <ul class="track-list">
      <li v-for="track in tracks" :key="track.mbid" class="track-wrapper">
        <Song :show-artist="false" :track="track" />
      </li>
    </ul>
  </div>
</template>

<script>
import Song from '@/components/Song.vue';

export default {
  name: 'ArtistTopTracks',
  components: {
    Song
  },
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  asyncComputed: {
    async tracks () {
      return this.$lastfm.getArtistTopTracks(this.artistName);
    }
  },
  computed: {
    ready () {
      return !!this.tracks;
    }
  }
};
</script>
