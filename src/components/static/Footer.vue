<template>
  <footer class="footer" :class="footerClass">
    <Player @show-player="show" />
    <div id="ytPlayer" />
  </footer>
</template>

<script>
import Player from '@/components/player/Player.vue';

export default {
  components: { Player },
  data () {
    return {
      elementHeight: '89px',
      footerClass: undefined
    };
  },
  mounted () {
    this.$nextTick(() => {
      const height = this.$el.clientHeight;

      this.elementHeight = `${height}px`;
      this.$el.style.setProperty('--footer-height', '0');

      this.$nextTick(() => {
        this.footerClass = 'animate-height';
      });
    });
  },
  methods: {
    show () {
      this.$el.style.setProperty('--footer-height', this.elementHeight);

      setTimeout(() => {
        if (this.footerClass) this.footerClass = undefined;
      }, 400);
    }
  }
};
</script>

<style lang="less">
.footer {
  font-family: 'Open Sans', sans-serif;
  display: block;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  z-index: 2;
  --footer-height: auto;

  height: var(--footer-height, 89px);

  &.animate-height {
    transition: height .3s ease-in-out;
    will-change: height;
  }
}

#ytPlayer {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
</style>
