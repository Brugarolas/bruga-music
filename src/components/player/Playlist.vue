<template>
  <router-link :to="{ name: 'Playlist', params: {} }">
    <div class="playlist">
      <i class="playlist-icon fas fa-list-ul"></i>
      <div class="playlist-info">{{ playlistStatus }}</div>
    </div>
  </router-link>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Playlist',
  computed: {
    ...mapGetters(['playlistStatus'])
  }
};
</script>

<style lang="less">
@import (reference, less) "../../assets/styles/colors.less";

.playlist {
  text-align: center;

  .playlist-icon {
    display: block;
    font-size: 30px;
    cursor: pointer;
    color: @color-light-gray;
    transform: scale3d(1.25, 1.1, 1);
    transition: color 0.3s ease-in-out;

    &:hover {
      color: @color-gray;
    }
  }
  .playlist-info {
    display: block;
    font-family: "Open Sans", sans-serif;
    font-size: 16px;
    color: #495057;
    margin-top: 2px;
    font-weight: 400;
  }
}
</style>
