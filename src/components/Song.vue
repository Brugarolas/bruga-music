<template>
  <a :href="track.url" target="_blank" class="track">
    <img :src="imageUrl">
    <h2 class="track-title">{{ title }}</h2>
  </a>
</template>

<script>
export default {
  name: 'Song',
  props: {
    track: {
      type: Object,
      required: true
    }
  },
  computed: {
    title () {
      return this.track.artist + ' - ' + this.track.name;
    },
    imageUrl () {
      return this.track.image[1]['#text'];
    }
  }
};
</script>

<style lang="less">
  .track {
    display: block;
    margin: 5px;
    margin-left: 75px;
    text-align: left;
  }
  .track-title {
    display: inline-block;
    margin: 0;
    vertical-align: 85%;
  }
</style>
