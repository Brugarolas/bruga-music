<template>
  <div class="progress-bar">
    <div class="duracion-background" @click="setPlayerTime" @mousemove="setHoverTime" />
    <div :style="{ width: percentage + '%' }" class="duration-progress" />
    <div :style="{ width: hover.percentage + '%' }" :data-tooltip="hover.time | duration" class="duration-hover" />
  </div>
</template>

<script>
import onResize from '@/utils/resize-events.js';

export default {
  name: 'ProgressBar',
  props: {
    time: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      rect: undefined,
      position: { },
      hover: {
        percentage: 0,
        time: 0,
        timeout: undefined,
        lastPositionX: undefined
      },
      resizeTaskId: undefined
    };
  },
  computed: {
    percentage: {
      get: function () {
        if (this.duration === 0) return 0;
        return ((this.time / this.duration) * 100).toFixed(2);
      },
      set: function (perc) {
        if (this.duration === 0) return;
        this.realTime = this.duration * perc;
      }
    },
    realTime: {
      get: function () {
        return this.time;
      },
      set: function (value) {
        this.$emit('changeTime', Number(value));
      }
    }
  },
  watch: {
    duration: function (newDuration) {
      this.reset();
    }
  },
  mounted () {
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
    setPlayerTime (event) {
      this.calcElementPosition(event);
      this.percentage = this.calcPercentage(event.pageX);
    },
    setHoverTime (event) {
      this.calcElementPosition(event);
      this.hover.lastPositionX = event.pageX;

      if (this.hover.timeout === undefined) {
        this.hover.timeout = setTimeout(this.updateHoverTimeEvent, 80);

        this.updateHoverTime(event.pageX);
      }
    },
    updateHoverTimeEvent () {
      this.updateHoverTime(this.hover.lastPositionX);
      this.hover.timeout = undefined;
    },
    updateHoverTime (eventPositionX) {
      let percentage = this.calcPercentage(eventPositionX);

      this.hover.time = this.duration * percentage;
      this.hover.percentage = (percentage * 100).toFixed(2);
    },
    calcElementPosition (event) {
      if (this.rect === undefined) {
        this.rect = event.target.getBoundingClientRect();
        this.position.x = Math.round(this.rect.x);
        this.position.width = this.rect.width;
      }
    },
    calcPercentage (eventPositionX) {
      let pos = eventPositionX - this.position.x;
      return pos / this.position.width;
    }
  }
};
</script>

<style lang="less">
@import (reference, less) "../../assets/styles/colors.less";

.progress-bar {
  display: inline-block;
  width: 100%;
}

.duration-bar() {
  position: absolute;
  top: 0;
  left: 0;

  display: block;
  height: 7px;
  border-radius: 4px;
  transition: all 0.1s linear;
}

.progress-bar {
  position: relative;
  display: inline-block;
  width: 100%;

  .duracion-background {
    .duration-bar();
    width: 100%;
    background-color: lighten(@color-gray, 50%);
    cursor: pointer;
  }

  .duration-hover {
    .duration-bar();
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

  .duration-progress {
    .duration-bar();
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

  .duracion-background:hover {
    & + .duration-progress {
      background-color: @color-red;

      &::after {
        background-color: @color-red;
        opacity: 1;
      }
    }

    & + .duration-progress + .duration-hover::before {
      opacity: 1;
    }
  }
}
</style>
