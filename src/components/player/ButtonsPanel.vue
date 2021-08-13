<template>
  <div class="buttons-panel">
    <i class="control-button bm-icon bm-icon-step-backward-solid" :class="{ 'disabled': !hasPrevSong }" @click="playPrevSong" />
    <i class="control-button bm-icon" :class="[isPlaying ? 'bm-icon-pause-solid' : 'bm-icon-play-solid']" @click="playPause" />
    <i class="control-button bm-icon bm-icon-step-forward-solid" :class="{ 'disabled': !hasNextSong }" @click="playNextSong" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'ButtonsPanel',
  props: {
    isPlaying: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    ...mapGetters(['hasPrevSong', 'hasNextSong'])
  },
  methods: {
    playPause () {
      this.$emit(this.isPlaying ? 'pause' : 'play');
    },
    playPrevSong () {
      this.$store.dispatch('playPrevSong');
    },
    playNextSong () {
      this.$store.dispatch('playNextSong');
    }
  }
};
</script>

<style lang="less">
@import (reference, less) "../../assets/styles/colors.less";

.buttons-panel {
  display: block;
  width: 100%;
  text-align: center;
  box-sizing: border-box;
  line-height: 24px;
  font-size: 28px;

  .control-button {
    cursor: pointer;
    color: @color-gray;
    transition: all 0.3s ease-in-out;

    &:hover {
      color: @color-dark-gray;
    }

    &.disabled {
      color: @color-lighter-gray;
      pointer-events: none;
    }

    &:not(:last-child) {
      margin-right: 10px;
    }
  }
}
</style>
