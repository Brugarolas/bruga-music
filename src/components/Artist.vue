<template>
  <router-link class="artist" :to="{ name: 'Artist', params: { name: artist.name } }">
    <h2 class="artist-name flex-no-borders">{{ artist.name }}</h2>
    <img :src="artist.image" class="artist-image">
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
  }
};
</script>

<style lang="less">
@artist-width: 200px;
@image-size: 156px;

.artist {
  width: @artist-width;
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
    width: @image-size;
    height: @image-size;
    margin: 0 auto;
    background-color: #ccc;
    object-fit: cover;
  }

  &:hover {
    background-color: #ccc2;
  }
}

@supports (display: flex) {
  .artist {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: flex-end;
    height: 240px;
    padding: 0;
    margin: 0;

    .artist-name {
      min-height: 48px;
    }
  }
}
</style>
