<template>
  <div class="similar">
    <h4 class="title">Similar Artists</h4>

    <ul class="artist-list flex-list">
      <Artist v-for="similar in similars" :key="similar.mbid" :artist="similar" extra-class="similar-artist" />
    </ul>
  </div>
</template>

<script>
import Artist from '@/components/Artist.vue';

export default {
  name: 'SimilarArtists',
  components: {
    Artist
  },
  props: {
    artist: {
      type: Object,
      required: true
    }
  },
  computed: {
    similars () {
      return this.artist.similar;
    }
  }
};
</script>

<style lang="less">
.artist-wrapper.similar-artist {
  margin: 0;

  &:not(:last-child) {
    margin-bottom: 32px;
  }

  .artist {
    width: 180px;
    height: auto;

    .artist-image {
      width: 156px;
      height: 156px;
    }

    .artist-name {
      font-size: 18px;
      max-height: 45px;
      width: 156px;
    }
  }
}

@supports (display: flex) {
  .artist-wrapper.similar-artist .artist {
    width: auto;
  }
}
</style>
