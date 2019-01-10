<template>
  <div id="app">
    <header class="header float-box">
      <router-link :to="{ name: 'Main', params: {} }"><i class="header-icon fas fa-music" /></router-link>
      <span class="header-title">Bruga Music</span>
      <div class="author">Made with <i class="heart fas fa-heart" /> by Andrés Brugarolas</div>
    </header>
    <main class="main">
      <transition name="move">
        <keep-alive :max="5">
          <router-view />
        </keep-alive>
      </transition>
    </main>
    <footer class="footer">
      <Player />
      <div id="ytPlayer" />
    </footer>
  </div>
</template>

<script>
import Player from '@/components/player/Player.vue';

export default {
  name: 'App',
  components: {
    Player
  }
};
</script>

<style lang="less">
@import (less) "./assets/styles/main.less";

.move-enter-active, .move-leave-active {
  transform: translateX(0);
  transition: all 0.3s ease-in-out;
}

.move-enter, .move-leave-to {
  transform: translateX(-100%);
}

#ytPlayer {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
</style>
