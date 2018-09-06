<template>
  <div id="app">
    <header class="header float-box">
      <router-link :to="{ name: 'Main', params: {} }"><i class="header-icon fas fa-music" /></router-link>
      <span class="header-title">Bruga Music</span>
      <div class="author">Made with <i class="heart fas fa-heart" /> by Andrés Brugarolas</div>
    </header>
    <main class="main">
      <transition>
        <keep-alive>
          <router-view />
        </keep-alive>
      </transition>
    </main>
    <footer class="footer">

    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style lang="less">
@import (less) "./assets/styles/main.less";
</style>
