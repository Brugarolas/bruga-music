<template>
  <section class="card card__small">
    <CloseButton :click="close" />
    <h2 class="track-list-header"><AnimatedEllipsis :play="true" text="Playing" /></h2>

    <ul class="track-list">
      <li v-for="track in playlist" :key="track.youtubeId" class="track-wrapper">
        <Song :track="track" />
      </li>
    </ul>
  </section>
</template>

<script>
import CloseButton from '@/components/common/CloseButton.vue';
import AnimatedEllipsis from '@/components/common/AnimatedEllipsis.vue';
import Song from '@/components/playlist/Song.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Playlist',
  components: {
    CloseButton, AnimatedEllipsis, Song
  },
  computed: {
    ...mapGetters(['playing', 'playlist', 'hasSong'])
  },
  methods: {
    close () {
      this.$router.go(-1);
    }
  },
  watch: {
    hasSong: function (hasSong) {
      if (!hasSong) {
        this.close();
      }
    }
  }
};
</script>

<style lang="less">
.track-list-header {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-transform: uppercase;
  font-size: 26px;
  letter-spacing: 6px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 25px;

  .dot {
    letter-spacing: 3px;
  }
}
</style>
