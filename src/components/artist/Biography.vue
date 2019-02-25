<template>
  <div v-if="hasBiography" class="biography">
    <h4 class="title">Biography</h4>
    <div>{{ artist.biography }}</div>
  </div>
</template>

<script>
export default {
  name: 'ArtistBiography',
  props: {
    artist: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasBiography () {
      return Boolean(this.artist.biography);
    }
  }
};
</script>
