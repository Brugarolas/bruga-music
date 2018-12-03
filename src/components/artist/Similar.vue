<template>
  <div v-if="ready" class="similar">
    <h4 class="title">Similar Artists</h4>

    <ul class="artist-list">
      <li v-for="similar in similars" :key="similar.name" class="artist-wrapper">
        <Artist :artist="similar" />
      </li>
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
    ready () {
      return this.artist && this.artist.similar && this.artist.similar.artist && this.artist.similar.artist.length > 0;
    },
    similars () {
      return this.artist.similar.artist;
    }
  }
};
</script>

<style lang="less">
.similar {
  .artist-wrapper {
    display: block;
    padding: 0;
  }

  .artist {
    .name {
      font-size: 18px;
      letter-spacing: 0.5px;
    }

    .image {
      width: 87px;
      height: 87px;
      border-radius: 50%;
    }
  }

  .artist-wrapper:first-child .artist .artist-name {
    margin-top: 0;
  }
}
</style>
