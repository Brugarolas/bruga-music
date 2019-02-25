<template>
  <router-link :to="{ name: 'Album', params: { name: album.artist, album: album.name } }" :class="'album'">
    <h2 class="album-name">{{ title }}</h2>
    <img :src="album.image" class="album-image">
  </router-link>
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
  .album-list {
    text-align: center;
  }

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
      text-align: center;
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
      margin: 0 22px;
      background-color: #ccc;
      object-fit: cover;
    }

    &:hover {
      background-color: #ccc2;
    }
  }
</style>
