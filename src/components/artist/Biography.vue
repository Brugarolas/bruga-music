<template>
  <div v-if="hasBiography" class="biography">
    <h4 class="title">Biography</h4>
    <div>{{ biography }}</div>
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
    ready () {
      return this.artist && !!(this.artist.bio.summary || this.artist.bio.content);
    },
    biography () {
      if (!this.ready) {
        return '';
      }

      let bio = this.artist.bio.summary || this.artist.bio.content;
      let index = bio.indexOf(' <a');
      return bio.substring(0, index);
    },
    hasBiography () {
      return !!this.biography;
    }
  }
};
</script>
