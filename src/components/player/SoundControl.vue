<template>
  <div class="sound-control">
    <div :class="{ muted: muted }" class="volume-icon-wrapper" @click="toggleMute">
      <i :class="icon" class="volume-icon fas" />
    </div>

    <div class="volume-bar-wrapper">
      <VolumeBar :muted="muted" @changeVolume="changeVolume" />
    </div>
  </div>
</template>

<script>
import VolumeBar from './VolumeBar.vue';

export default {
  name: 'SoundPlayer',
  components: { VolumeBar },
  data () {
    return {
      muted: false,
      volume: 1
    };
  },
  computed: {
    icon () {
      if (this.volume < 0.01) return 'fa-volume-off';
      if (this.volume < 0.50) return 'fa-volume-down';
      return 'fa-volume-up';
    }
  },
  mounted () {
    this.$bus.$on('api-change-volume', volume => {
      this.volume = volume;
    });

    this.$bus.$on('api-change-mute', muted => {
      this.muted = muted;
    });
  },
  methods: {
    toggleMute () {
      this.muted = !this.muted;
      this.$emit(this.muted ? 'mute' : 'unmute');
    },
    changeVolume (volume) {
      this.volume = volume;
      this.$emit('changeVolume', volume);
    }
  }
};
</script>

<style lang="less">
@import (less, reference) "../../assets/styles/colors.less";

.sound-control {
  .volume-icon-wrapper {
    position: relative;
    display: inline-block;
    text-align: left;
    width: 27px;
    margin-right: 8px;
    cursor: pointer;

    &.muted::after {
      content: ' ';
      position: absolute;
      display: block;
      background-color: @color-gray;
      width: 3px;
      height: 35px;
      top: -8px;
      right: 10px;
      transform: rotate(45deg);
      border-radius: 5px;
      border: 2px solid @color-gray;
      transition: all 0.3s ease-in-out;
    }

    .volume-icon {
      font-size: 28px;
      cursor: pointer;
      color: @color-gray;
      transition: all 0.3s ease-in-out;
    }

    &.muted:hover::after {
      background-color: @color-dark-gray;
      border-color: @color-dark-gray;
    }

    &:hover .volume-icon {
      color: @color-dark-gray;
    }
  }

  .volume-bar-wrapper {
    display: inline-block;
    width: calc(100% - 60px);
    vertical-align: 65%;
    opacity: 0;
    transition: all 0.3s ease-in-out;
  }

  &:hover .volume-bar-wrapper {
    opacity: 1;
  }
}
</style>
