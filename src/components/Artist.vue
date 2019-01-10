<template>
  <router-link :to="{ name: 'Artist', params: { name: artist.name } }" :class="'artist'">
    <h2 class="artist-name">{{ artist.name }}</h2>
    <img :src="imageUrl" class="artist-image">
  </router-link>
</template>

<script>
export default {
  name: 'Artist',
  props: {
    artist: {
      type: Object,
      required: true
    }
  },
  computed: {
    imageUrl () {
      return this.artist.image[2]['#text'];
    }
  }
};
</script>

<style lang="less">
  .artist {
    width: 200px;
    padding: 5px;
    margin: 10px 0 5px 0;
    display: inline-block;
    box-sizing: border-box;
    background-color: #ccc0;
    transition: all 0.3s ease-in-out;

    .artist-name {
      display: block;
      width: 100%;
      font-size: 20px;
      max-height: 50px;
      overflow: hidden;
    }

    .artist-image {
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
