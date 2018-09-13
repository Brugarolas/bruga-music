<template>
  <div :class="'album'">
    <h2 class="album-name">{{ title }}</h2>
    <img :src="imageUrl" class="album-image">
  </div>
</template>

<script>
export default {
  name: 'Album',
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  computed: {
    title () {
      return this.album.artist + ' - ' + this.album.name;
    },
    imageUrl () {
      return this.album.image[2]['#text'];
    }
  }
};
</script>

<style lang="less">
  .album {
    width: 200px;
    padding: 5px;
    margin: 10px 0 5px 0;
    display: inline-block;
    box-sizing: border-box;
    background-color: #ccc0;
    transition: all 0.3s ease-in-out;

    .album-name {
      display: block;
      width: 100%;
      font-size: 20px;
      max-height: 50px;
      overflow: hidden;
    }

    .album-image {
      display: inline-block;
      border-radius: 4px;
      width: 156px;
      height: 156px;
      background-color: #ccc;
      object-fit: cover;
    }

    &:hover {
      background-color: #ccc2;
    }
  }
</style>
