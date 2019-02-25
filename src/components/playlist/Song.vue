<template>
  <a class="track">
    <img :src="song.image" class="track-image">
    <i class="track-play fas fa-play" />
    <h2 class="track-title">{{ title }}</h2>
  </a>
</template>

<script>
export default {
  name: 'PlaylistSong',
  props: {
    song: {
      type: Object,
      required: true
    }
  },
  computed: {
    title () {
      return this.song.artist + ' - ' + this.song.track;
    }
  }
};
</script>

<style lang="less">

</style>
