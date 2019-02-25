<template>
  <div v-if="hasSummary" class="wiki">
    <h4 class="title">Summary</h4>
    <div>{{ album.wiki }}</div>
  </div>
</template>

<script>
export default {
  name: 'AlbumWiki',
  props: {
    album: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasSummary () {
      return Boolean(this.album.wiki);
    }
  }
};
</script>

<style lang="less">
.wiki {
  font-family: 'Open Sans', sans-serif;
  padding: 0 20px;
  font-size: 16px;
  text-align: justify;
}
</style>
