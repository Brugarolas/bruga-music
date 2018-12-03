<template>
  <ul v-if="ready" class="tag-list">
    <li v-for="tag in tags" :key="tag.name" class="tag">
      <span style="margin-right: 2px;">{{ tag.name | lowercase }}</span>
      <i class="fas fa-tag" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'ArtistTopTags',
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  asyncComputed: {
    async tags () {
      return this.$lastfm.getArtistTopTags(this.artistName, 5);
    }
  },
  computed: {
    ready () {
      return !!this.tags;
    }
  }
};
</script>
