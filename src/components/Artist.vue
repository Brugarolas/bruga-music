<template>
  <component :is="tagName" class="artist-wrapper" :class="[extraClass]">
    <router-link class="artist" :to="{ name: 'Artist', params: { name: artist.name } }">
      <img :src="artist.image" class="artist-image">
      <h2 class="artist-name">{{ artist.name }}</h2>
    </router-link>
  </component>
</template>

<script>
export default {
  name: 'Artist',
  props: {
    artist: {
      type: Object,
      required: true
    },
    tagName: {
      type: String,
      default: 'li'
    },
    extraClass: {
      type: String,
      default: undefined
    }
  }
};
</script>

<style lang="less">
@import (reference, less) "../assets/styles/colors.less";

@artist-width: 200px;
@image-size: 174px;
@border-radius: 8px;

.artist-wrapper {
  margin: 18px;
}

.artist {
  width: @artist-width;
  padding: 5px;
  margin: 10px 0 5px 0;
  display: inline-block;
  box-sizing: border-box;
  transition: transform .3s ease-in-out;
  overflow: hidden;

  .artist-image {
    display: inline-block;
    width: @image-size;
    height: @image-size;
    margin: 0 auto;
    border-radius: @border-radius;
    object-fit: cover;

    &[src=""] {
      background-color: @color-background-transparent;
    }
  }

  .artist-name {
    display: block;
    width: @image-size;
    font-size: 20px;
    max-height: 50px;
    overflow: hidden;
    margin: 0 auto;
  }

  &:hover {
    transform: scale3d(1.05, 1.05, 1);
  }
}

@supports (display: flex) {
  .artist {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: auto;
    height: 236px;
    padding: 0;
    margin: 0;

    .artist-name {
      margin-top: 10px;
    }
  }
}
</style>
