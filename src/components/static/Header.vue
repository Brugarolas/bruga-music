<template>
  <header class="header float-box loading-translate">
    <router-link :to="{ name: 'Main', params: {} }"><i class="header-icon fas fa-music" /></router-link>
    <span class="header-title">Bruga Music</span>
    <div class="author"><span class="author-text">Made with </span><i class="heart fas fa-heart" /><span class="author-text"> by Andrés Brugarolas</span></div>
  </header>
</template>

<script>
export default {
  name: 'Header'
};
</script>

<style lang="less">
@import (less, reference) "../../assets/styles/main.less";

.header {
  display: block;
  position: relative;
  box-sizing: border-box;
  padding: 12px 50px;
  background-color: @color-header-background;
  box-shadow: @background-shadow;
  z-index: 5;

  .header-title {
    font-family: 'Roboto', sans-serif;
    .fontFixes();
    color: @color-white;
    font-size: 24px;
    margin-left: 8px;
    letter-spacing: 1px;
    font-weight: 500;
  }

  .header-icon {
    font-size: 24px;
    color: @color-white;
    background-color: @main-color;
    padding: 10px 11px 10px 9px;
    border-radius: 4px;
    text-shadow: 2px 2px 0px @main-dark-color;
    transition: all .3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  .author {
    font-family: 'Open Sans', sans-serif;
    color: @color-white;
    display: inline-block;
    text-align: right;
    float: right;
    font-size: 18px;
    line-height: 44px;
    font-weight: 100;

    .author-text {
      opacity: 0.5;
    }
    .heart {
      color: @color-heart;
      font-size: 20px;
      opacity: 0.68;
    }
  }
}
</style>
