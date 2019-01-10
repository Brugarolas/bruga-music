<template>
  <Tags v-if="ready" :tags="tags" />
</template>

<script>
import Tags from '@/components/Tags.vue';

export default {
  name: 'ArtistTopTags',
  components: {
    Tags
  },
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
