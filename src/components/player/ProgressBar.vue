<template>
  <div class="progress-bar">
    <div v-if="isNative" class="progress-bar-native-wrapper">
      <input v-model="realTime" :max="duration" class="progress-bar-native" type="range" min="0" step="0.05">
    </div>

    <div v-if="isHtml" class="progress-bar-html">
      <div class="duracion-background" @click="setPlayerTime" @mousemove="setHoverTime" />
      <div :style="{ width: percentage + '%' }" class="duration-progress" />
      <div :style="{ width: hover.percentage + '%' }" :data-tooltip="hover.time | duration" class="duration-hover" />
    </div>
  </div>
</template>

<script>
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
    },
    technology: {
      type: String,
      default: 'html'
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
      }
    };
  },
  computed: {
    isNative () {
      return this.technology === 'native';
    },
    isHtml () {
      return this.technology === 'html';
    },
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
    duration: function (val) {
      this.rect = undefined;
    }
  },
  methods: {
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

.progress-bar-html {
  position: relative;
  display: inline-block;
  width: 100%;

  .duracion-background {
    .duration-bar();
    width: 100%;
    background-color: @color-gray;
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
      background: #464646;
      color: #fff;
      width: 50px;
      padding: 4px 0;
      text-align: center;
      position: absolute;
      top: -32px;
      border-radius: 4px;
      right: -25px;
      opacity: 0;
      transition: all 0.1s linear;
      box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.10);
    }
  }

  .duration-progress {
    .duration-bar();
    background-color: @color-dark-gray;
    pointer-events: none;

    &::after {
      content: '';
      background-color: @color-dark-gray;
      width: 11px;
      height: 11px;
      position: absolute;
      top: -2px;
      right: -2px;
      border-radius: 50%;
      opacity: 0;
      transition: all 0.1s linear;
      box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.10);
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

.progress-bar-native-wrapper {
  display: inline-block;
  width: 100%;
}

.progress-bar-native {
  -webkit-appearance: none;
  width: 100%;
  margin: 1.8px 0;

  &:focus {
    outline: none;
  }

  &::-webkit-slider-runnable-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }

  &::-webkit-slider-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 12px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -2px;
  }

  &:focus::-webkit-slider-runnable-track {
    background: #367ebd;
  }

  &::-moz-range-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    background: #3071a9;
    border-radius: 1.3px;
    border: 0.2px solid #010101;
  }

  &::-moz-range-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 12px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
  }

  &::-ms-track {
    width: 100%;
    height: 8.4px;
    cursor: pointer;
    background: transparent;
    border-color: transparent;
    color: transparent;
  }

  &::-ms-fill-lower {
    background: #2a6495;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }

  &::-ms-fill-upper {
    background: #3071a9;
    border: 0.2px solid #010101;
    border-radius: 2.6px;
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
  }

  &::-ms-thumb {
    box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    border: 1px solid #000000;
    height: 12px;
    width: 16px;
    border-radius: 3px;
    background: #ffffff;
    cursor: pointer;
    height: 8.4px;
  }

  &:focus::-ms-fill-lower {
    background: #3071a9;
  }

  &:focus::-ms-fill-upper {
    background: #367ebd;
  }
}
</style>
