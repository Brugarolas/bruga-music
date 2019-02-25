<template>
  <section class="card">
    <CloseButton :click="close" />

    <ul class="track-list">
      <li v-for="song in playlist" :key="song.youtubeId" class="track-wrapper">
        <Song :song="song" />
      </li>
    </ul>
  </section>
</template>

<script>
import CloseButton from '@/components/common/CloseButton.vue';
import Song from '@/components/playlist/Song.vue';
import { mapGetters } from 'vuex';

export default {
  name: 'Playlist',
  components: {
    CloseButton, Song
  },
  computed: {
    ...mapGetters(['playlist'])
  },
  methods: {
    close () {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="less">

</style>
