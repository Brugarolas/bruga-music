<template>
  <a class="track" @click="selectSong">
    <img :src="imageUrl" class="track-image">
    <i class="track-play fas" :class="[hasSong ? 'fa-plus' : 'fa-play']" />
    <h2 class="track-title">{{ title }}</h2>
  </a>
</template>

<script>
import { mapGetters } from 'vuex';
import { str } from '@/utils/aux-methods.js';

export default {
  name: 'Song',
  props: {
    track: {
      type: Object,
      required: true
    },
    image: {
      type: String,
      default: null,
      required: false
    }
  },
  computed: {
    ...mapGetters(['hasSong']),
    artist () {
      let artist = this.track.artist;
      return typeof artist === 'object' ? artist.name : artist;
    },
    title () {
      return this.artist + ' - ' + this.track.name;
    },
    imageUrl () {
      return this.image ? this.image : this.track.image[1]['#text'];
    }
  },
  methods: {
    selectSong () {
      this.$store.dispatch('playSong', { 'artist': str(this.artist), 'track': str(this.track.name), 'image': this.imageUrl });
    }
  }
};
</script>

<style lang="less">
.track {
  position: relative;
  display: block;
  margin: 5px 75px;
  text-align: left;
  cursor: pointer;
  border-radius: 4px;
  background-color: #ccc0;
  transition: all 0.3s ease-in-out;

  .track-title {
    display: inline-block;
    margin: 0;
    margin-left: 10px;
    vertical-align: 65%;
    font-size: 20px;
    width: calc(100% - 80px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .track-image {
    display: inline-block;
    border-radius: 4px;
    width: 56px;
    height: 56px;
    background-color: #ccc;
    object-fit: cover;
  }
  .track-play {
    position: absolute;
    font-size: 28px;
    opacity: 0;
    color: #fff;
    top: 14px;
    left: 16px;
    z-index: 3;
    pointer-events: none;
    transition: opacity 0.3s ease-in-out;

    &.fa-plus {
      font-size: 36px;
      top: 11px;
      left: 11px;
    }
  }

  &:hover {
    background-color: #ccc2;

    .track-play {
      opacity: 0.90;
    }
  }
}
</style>
