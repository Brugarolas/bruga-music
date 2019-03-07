<template>
  <a class="track playlist-track" :class="{ 'track-selected': selected }" @click="selectSong">
    <img :src="track.image" class="track-image">
    <i class="track-play fas fa-play" />
    <h2 class="track-title">
      <span class="track-artist">{{ track.artist }}</span><span class="track-name">{{ track.track }}</span>
    </h2>
  </a>
</template>

<script>
import { mapGetters } from 'vuex';
import { str } from '@/utils/aux-methods.js';

export default {
  name: 'PlaylistSong',
  props: {
    track: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['playing']),
    selected () {
      return this.playing.youtubeId === this.track.youtubeId;
    }
  },
  methods: {
    selectSong () {
      if (this.selected) {
        return;
      }

      this.$store.dispatch('changePlayingSong', { 'artist': str(this.track.artist), 'track': str(this.track.track) });
    }
  }
};
</script>

<style lang="less">
@import (reference, less) "../../assets/styles/colors.less";

.track.playlist-track {
  margin: 5px 25px;

  .track-play {
    opacity: 0;
  }

  &:hover .track-play {
    opacity: 0.9;
  }

  .track-title {
    color: @color-letter;

    .track-artist {
      font-family: "Roboto", sans-serif;
      font-weight: 800;
    }

    .track-name {
      font-family: "Open Sans", sans-serif;
      font-weight: 300;

      &::before {
        content: " - ";
        margin: 0 2px;
      }
    }
  }

  &.track-selected {
    background-color: @color-background-dark;

    .track-play {
      opacity: 1;
    }

    .track-title {
      font-size: 21px;
    }
  }

}
</style>
