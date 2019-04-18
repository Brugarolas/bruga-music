<template>
  <div class="volume-bar">
    <div :class="{ muted: muted }" class="volume-background" @click="setPlayerVolume" @mousemove="setHoverVolume" />
    <div :style="{ width: percentage + '%' }" class="volume-progress" />
    <div :style="{ width: hover.percentage + '%' }" :data-tooltip="hover.volume | volume" class="volume-hover" />
  </div>
</template>

<script>
import onResize from '@/utils/resize-events.js';

export default {
  name: 'VolumeBar',
  props: {
    muted: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      volume: 1,
      rect: undefined,
      position: { },
      hover: {
        percentage: 0,
        volume: 0,
        timeout: undefined,
        lastPositionX: undefined
      },
      resizeTaskId: undefined
    };
  },
  computed: {
    percentage () {
      return (this.volume * 100).toFixed(2);
    }
  },
  mounted () {
    this.$bus.$on('api-change-volume', volume => {
      this.volume = volume;
    });

    this.resizeTaskId = onResize.addEvent(() => {
      this.reset();
    });
  },
  beforeDestroy () {
    onResize.removeEvent(this.resizeTaskId);
  },
  methods: {
    reset () {
      this.rect = undefined;
    },
    setPlayerVolume (event) {
      if (this.muted) return;

      this.calcElementPosition(event);
      this.volume = this.calcVolume(event.pageX);

      this.$emit('changeVolume', this.volume);
    },
    setHoverVolume (event) {
      if (this.muted) return;

      this.calcElementPosition(event);
      this.hover.lastPositionX = event.pageX;

      if (this.hover.timeout === undefined) {
        this.hover.timeout = setTimeout(this.updateHoverVolumeEvent, 80);

        this.updateHoverVolume(event.pageX);
      }
    },
    updateHoverVolumeEvent () {
      this.updateHoverVolume(this.hover.lastPositionX);
      this.hover.timeout = undefined;
    },
    updateHoverVolume (eventPositionX) {
      this.hover.volume = this.calcVolume(eventPositionX);
      this.hover.percentage = (this.hover.volume * 100).toFixed(2);
    },
    calcVolume (eventPositionX) {
      let pos = eventPositionX - this.position.x;
      return (pos / this.position.width).toFixed(2);
    },
    calcElementPosition (event) {
      if (this.rect === undefined) {
        this.rect = event.target.getBoundingClientRect();
        this.position.x = Math.round(this.rect.x);
        this.position.width = this.rect.width;
      }
    }
  }
};
</script>

<style lang="less">
@import (reference, less) "../../assets/styles/colors.less";

.volume-bar-aux() {
  position: absolute;
  top: 0;
  left: 0;

  display: block;
  height: 7px;
  border-radius: 4px;
  transition: all 0.1s linear;
}

.volume-bar {
  position: relative;
  display: inline-block;
  width: 100%;

  .volume-background {
    .volume-bar-aux();
    width: 100%;
    background-color: lighten(@color-gray, 50%);

    &:not(.muted) {
      cursor: pointer;
    }
  }

  .volume-hover {
    .volume-bar-aux();
    background: transparent;
    pointer-events: none;

    &::before {
      font-family: 'Open Sans', sans-serif;
      font-size: 14px;
      content: attr(data-tooltip);
      background: @color-gray;
      color: @color-white;
      width: 50px;
      padding: 4px 0;
      text-align: center;
      position: absolute;
      top: -32px;
      border-radius: 4px;
      right: -25px;
      opacity: 0;
      transition: all 0.1s linear;
      box-shadow: 0 0 2px 2px @color-shadow-light;
      z-index: 5;
    }
  }

  .volume-progress {
    .volume-bar-aux();
    background-color: @color-light-gray;
    pointer-events: none;

    &::after {
      content: '';
      background-color: @color-light-gray;
      width: 11px;
      height: 11px;
      position: absolute;
      top: -2px;
      right: -2px;
      border-radius: 50%;
      opacity: 0;
      transition: all 0.1s linear;
      box-shadow: 0 0 1px 1px @color-shadow-light;
    }
  }

  .volume-background:not(.muted):hover {
    & + .volume-progress {
      background-color: @color-music;

      &::after {
        background-color: @color-music;
        opacity: 1;
      }
    }

    & + .volume-progress + .volume-hover::before {
      opacity: 1;
    }
  }
}
</style>
