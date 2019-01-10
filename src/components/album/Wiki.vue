<template>
  <div v-if="hasSummary" class="wiki">
    <h4 class="title">Summary</h4>
    <div>{{ summary }}</div>
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
    wiki () {
      return this.album.wiki;
    },
    ready () {
      return this.wiki && !!(this.wiki.summary || this.wiki.content);
    },
    summary () {
      if (!this.ready) {
        return '';
      }

      let sum = this.wiki.summary || this.wiki.content;
      let hasSummary = !!this.wiki.summary;

      let index = sum.indexOf(' <a');
      return sum.substring(0, index) + (hasSummary ? '...' : '');
    },
    hasSummary () {
      return !!this.summary;
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
