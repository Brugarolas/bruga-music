<template>
  <a class="track" @click="selectSong" :class="{ 'track-in-playlist': inPlaylist, 'track-selected': selected }">
    <img :src="track.image" class="track-image">
    <i class="track-play fas" :class="faIcon" />
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
    showArtist: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      inPlaylist: false
    };
  },
  computed: {
    ...mapGetters(['hasSong', 'playing']),
    name () {
      return this.track.name;
    },
    artist () {
      let artist = this.track.artist;
      return typeof artist === 'object' ? artist.name : artist;
    },
    selected () {
      let playing = this.playing;
      return this.name === playing.track && this.artist === playing.artist;
    },
    title () {
      if (!this.showArtist) {
        return this.name;
      }
      return `${this.artist} - ${this.name}`;
    },
    faIcon () {
      if (this.selected) {
        return 'fa-play';
      }
      if (this.inPlaylist) {
        return 'fa-check';
      }
      return this.hasSong ? 'fa-plus' : 'fa-play';
    }
  },
  mounted () {
    this.updateSelected();
  },
  updated () {
    this.updateSelected();
  },
  methods: {
    selectSong () {
      if (this.selected) {
        return;
      }

      if (this.inPlaylist) {
        this.$store.dispatch('changePlayingSong', { 'artist': str(this.artist), 'track': str(this.name) });
      } else {
        this.$store.dispatch('addOrPlaySong', { 'artist': str(this.artist), 'track': str(this.name), 'image': this.track.image });
        this.inPlaylist = true;
      }
    },
    updateSelected () {
      this.inPlaylist = Boolean(this.$store.getters.searchSongByNameAndArtist(str(this.name), str(this.artist)));
    }
  }
};
</script>

<style lang="less">
@import (reference, less) "../assets/styles/colors.less";

.track {
  position: relative;
  display: flex;
  align-items: center;
  margin: 5px 75px;
  text-align: left;
  cursor: pointer;
  border-radius: 4px;
  background-color: transparent;
  transition: all 0.3s ease-in-out;

  .track-title {
    display: inline-block;
    margin: 0;
    margin-left: 10px;
    vertical-align: 65%;
    font-size: 18px;
    font-weight: 300;
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
    background-color: @color-background-transparent-ie11;
    background-color: @color-background-transparent;

    .track-play {
      opacity: 0.90;
    }
  }

  &.track-in-playlist {
    background-color: @color-background-transparent-ie11;
    background-color: @color-background-transparent;

    .track-title {
      font-weight: 600;
      color: @color-letter;
    }
    .track-image {
      transform: none;
    }
    .track-play {
      opacity: 1;
    }
  }
}
</style>
