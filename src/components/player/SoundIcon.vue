<template>
  <div :class="{ stopped: !playing }" class="bars">
    <div class="bar" />
    <div class="bar" />
    <div class="bar" />
    <div class="bar" />
    <div class="bar" />
    <div class="bar" />
    <div class="bar" />
    <div class="bar" />
    <div class="bar" />
    <div class="bar" />
  </div>
</template>

<script>
export default {
  name: 'SoundIcon',
  props: {
    playing: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="less">
@import (reference, less) "../../assets/styles/colors.less";

/* Variables */
@max-height: 27px;
@min-height: 7px;
@width: 7px;

/* Define two variables as the loop limits */
@from : 1;
@to : 10;

/* Array */
@animations: {
  @1:  674ms;
  @2:  733ms;
  @3:  607ms;
  @4:  758ms;
  @5:  800ms;
  @6:  627ms;
  @7:  641ms;
  @8:  719ms;
  @9:  587ms;
  @10: 742ms;
}

/* Create a Parametric mixin and add a guard operation */
.loop(@index) when(@index =< @to) {

  /* As the mixin is called CSS is outputted */
  &:nth-child(@{index}) {
    left: unit((@index - 1) * (@width + 1), px);
    animation-duration: @animations[@@index];
  }

  /* Interation call and operation */
  .loop(@index + 1);
}

.bars {
  position: relative;
  display: block;
  width: unit(@to * (@width + 1), px);
  height: @max-height;
  margin: auto;

  &.stopped .bar {
    animation: none;
    opacity: 0.35;
    bottom: unit((@max-height - @min-height) / 2, px);
  }
}

.bar {
  background: @color-music;
  bottom: 0;
  height: @min-height;
  position: absolute;
  width: @width;
  animation: sound 0ms -800ms linear infinite alternate;
  transition: all 0.65s ease-in-out;

  .loop(@from);
}

@keyframes sound {
  0% {
    opacity: .35;
    height: @max-height;
  }
  100% {
    opacity: 1;
    height: @min-height;
    }
}
</style>
