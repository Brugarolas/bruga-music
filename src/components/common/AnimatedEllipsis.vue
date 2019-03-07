<template>
  <span class="animated-ellipsis" :class="{ 'stop-animation': !play }">{{ text }}<span class="dot one">.</span><span class="dot two">.</span><span class="dot three">.</span></span>
</template>

<script>
export default {
  name: 'AnimatedEllipsis',
  props: {
    text: {
      type: String,
      required: true
    },
    play: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style lang="less">
.animated-ellipsis {
  display: inline;

  .dot {
    opacity: 0;
    animation: dot 1.3s infinite;

    &.one {
      animation-delay: 0.0s;
    }
    &.two {
      animation-delay: 0.2s;
    }
    &.three {
      animation-delay: 0.3s;
    }
  }

  &.stop-animation .dot {
    animation: none;
  }
}

@keyframes dot {
      0% { opacity: 0; }
     50% { opacity: 0; }
    100% { opacity: 1; }
}
</style>
