<template>
  <div id="app" class="full-height-viewport max-height-viewport scrolling-parent">
    <Header />
    <main class="main loading-scale scrolling-element">
      <transition :name="transitionName" :mode="transitionMode">
        <keep-alive :max="5">
          <router-view />
        </keep-alive>
      </transition>

      <div id="log-messages" style="padding: 20px 0;" />
    </main>

    <Footer />
  </div>
</template>

<script>
import Header from '@/components/static/Header.vue';
import Footer from '@/components/static/Footer.vue';

const DEFAULT_TRANSITION = 'slide-left';
const DEFAULT_TRANSITION_MODE = 'out-in';

export default {
  name: 'App',
  components: {
    Header, Footer
  },
  data () {
    return {
      transitionName: DEFAULT_TRANSITION,
      transitionMode: DEFAULT_TRANSITION_MODE,
      transitionEnterActiveClass: null
    };
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName || DEFAULT_TRANSITION;

      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').length;
        const fromDepth = from.path.split('/').length;
        transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
      }

      this.transitionMode = DEFAULT_TRANSITION_MODE;
      this.transitionEnterActiveClass = `${transitionName}-enter-active`;

      if (to.meta.transitionName === 'zoom') {
        this.transitionMode = DEFAULT_TRANSITION_MODE;
        this.transitionEnterActiveClass = 'zoom-enter-active';
      }
      if (from.meta.transitionName === 'zoom') {
        this.transitionMode = null;
        this.transitionEnterActiveClass = null;
        transitionName = 'zoom';
      }

      this.transitionName = transitionName;

      next();
    });
  },
  mounted () {
    /* Set viewport height size only in Android for CSS .full-height-viewport-android class
     * https://dev.to/peiche/100vh-behavior-on-chrome-2hm8
     */
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isAndroid = userAgent.includes('android');

    if (isAndroid) {
      const body = document.body || document.querySelector('body');

      body.style.setProperty('--viewport-height', '56px');
    }

    /* Stop loader if two seconds have passed
     * Loader should be stopped in each route when all AJAX are completed
     * This is here in case I forgot to stop loader on routes (or AJAX fails or something)
     * If loader is already stopped this sould do nothing
     */
    if (!window.stopLoadingWithDelay) {
      return;
    }

    // Wait until all children has been rendered
    this.$nextTick(() => {
      window.stopLoadingWithDelay(500);
    });
  }
};
</script>

<style lang="less">
@import (less) "./assets/styles/main.less";

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.4s;
  transition-property: opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translateX(100%);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translateX(-100%);
}

.zoom-enter-active,
.zoom-leave-active {
  animation-duration: 0.4s;
  animation-fill-mode: both;
  animation-name: zoom;
}

.zoom-leave-active {
  animation-direction: reverse;
  position: absolute;
}

@keyframes zoom {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  100% {
    opacity: 1;
  }
}

.main {
  display: block; // IE11 fix
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  .fontFixes();
  color: @color-white;
  position: relative;
  box-sizing: border-box;
  overflow-x: hidden;
  padding-top: 48px;
}
</style>
