<template>
  <component :is="tagName" class="album-wrapper" :class="[extraClass]">
    <router-link :to="{ name: 'Album', params: { name: album.artist, album: album.name } }" :class="'album'">
      <img :src="album.image" class="album-image">
      <h2 class="album-name">{{ title }}</h2>
    </router-link>
  </component>
</template>

<script>
export default {
  name: 'Album',
  props: {
    album: {
      type: Object,
      required: true
    },
    ignoreArtist: {
      type: Boolean,
      default: false
    },
    tagName: {
      type: String,
      default: 'li'
    },
    extraClass: {
      type: String,
      default: undefined
    }
  },
  computed: {
    title () {
      return (this.ignoreArtist ? '' : this.album.artist + ' - ') + this.album.name;
    }
  }
};
</script>

<style lang="less">
@import (reference, less) "../assets/styles/colors.less";

@album-width: 180px;
@image-size: 156px;
@border-radius: 4px;

.album-wrapper {
  margin: 12px;
}

.album {
  width: @album-width;
  padding: 5px;
  margin: 10px 0 5px 0;
  display: inline-block;
  box-sizing: border-box;
  text-align: center;
  transition: transform 0.3s ease-in-out;
  overflow: hidden;

  .album-image {
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

  .album-name {
    display: block;
    width: @image-size;
    font-size: 16px;
    max-height: 40px;
    overflow: hidden;
    margin: 0 auto;
  }

  &:hover {
    transform: scale3d(1.05, 1.05, 1);
  }
}
</style>
