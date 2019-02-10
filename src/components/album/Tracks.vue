<template>
  <div class="tracks margin-top-xl">
    <h4 class="title">Tracks</h4>

    <ul class="track-list">
      <li v-for="track in tracks" :key="track.mbid" class="track-wrapper">
        <Song :track="track" :image="image" />
      </li>
    </ul>
  </div>
</template>

<script>
import Song from '@/components/Song.vue';

export default {
  name: 'AlbumTracks',
  components: {
    Song
  },
  props: {
    tracks: {
      type: Array,
      required: true
    },
    image: {
      type: String,
      default: null,
      required: false
    }
  }
};
</script>
