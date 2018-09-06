<template>
  <router-link :to="{ name: 'Artist', params: { name: artist.name.replace(/ /g, '+') } }" :class="'artist'">
    <h2 class="name">{{ artist.name }}</h2>
    <img :src="imageUrl" class="image">
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
    margin: 5px;
    display: inline-block;
  }
</style>
