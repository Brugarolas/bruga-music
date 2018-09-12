<template>
  <a class="track" @click="selectSong">
    <img :src="imageUrl">
    <h2 class="track-title">{{ title }}</h2>
  </a>
</template>

<script>
import { str } from '@/utils/aux-methods.js';

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
  },
  methods: {
    selectSong () {
      this.$store.dispatch('playSong', { 'artist': str(this.track.artist), 'track': str(this.track.name), 'image': this.imageUrl });
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
