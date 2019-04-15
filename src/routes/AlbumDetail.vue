<template>
  <section class="album-detail">
    <Spinner v-if="loading" />

    <div v-if="initialized" class="card">
      <div class="main-info float-box">
        <GoBackButton />

        <img :src="album.image" class="image">
        <h1 class="name">{{ album.name }}</h1>

        <div class="extra">
          <span class="extra-title">Listeners</span>
          <span class="extra-info">{{ album.stats.listeners | humanNumber }}</span>
        </div>

        <div class="extra">
          <span class="extra-title">Scrobblings</span>
          <span class="extra-info">{{ album.stats.playcount | humanNumber }}</span>
        </div>

        <div class="tags">
          <Tags v-if="hasTags" :tags="album.tags" />
        </div>
      </div>

      <div class="float-box">
        <Wiki :album="album" />

        <Tracks v-if="hasTracks" :tracks="album.tracks" :image="album.image" />
      </div>

      <a :href="album.moreLink" target="_blank">More information</a>
    </div>
  </section>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import GoBackButton from '@/components/common/GoBackButton.vue';
import Tags from '@/components/Tags.vue';
import Wiki from '@/components/album/Wiki.vue';
import Tracks from '@/components/album/Tracks.vue';

export default {
  name: 'AlbumDetail',
  components: {
    Spinner, GoBackButton, Tags, Wiki, Tracks
  },
  data () {
    return {
      name: {
        album: '',
        artist: ''
      },
      album: { },
      initialized: false,
      loading: true
    };
  },
  computed: {
    hasTags () {
      return this.album.tags && this.album.tags.length > 0;
    },
    hasTracks () {
      return this.album.tracks && this.album.tracks.length > 0;
    }
  },
  activated () {
    this.load();
  },
  beforeRouteUpdate (to, from, next) {
    this.name.artist = to.params.name;
    this.name.album = to.params.album;
    this.searchAlbum();
    next();
  },
  methods: {
    load () {
      this.name.artist = this.$route.params.name;
      this.name.album = this.$route.params.album;
      this.searchAlbum();
    },
    reset () {
      if (this.album.tracks) {
        this.album.tracks = {};
      }
    },
    searchAlbum () {
      this.loading = true;
      const { artist, album } = this.name;
      this.reset();

      this.$lastfm.getAlbumInfo(artist, album).then(album => {
        this.album = album;
        this.loading = false;
        this.initialized = true;

        window.stopLoadingWithDelay();
      });
    }
  }
};
</script>

<style lang="less">
.artist-detail {
  position: relative;
}
</style>
