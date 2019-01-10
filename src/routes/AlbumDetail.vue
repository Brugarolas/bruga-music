<template>
  <section class="album-detail">
    <Spinner v-if="loading" />

    <div v-if="initialized" class="card">
      <div class="main-info float-box">
        <img :src="imageUrl" class="image">
        <h1 class="name">{{ album.name }}</h1>

        <div class="extra">
          <span class="extra-title">Listeners</span>
          <span class="extra-info">{{ album.listeners | humanNumber }}</span>
        </div>

        <div class="extra">
          <span class="extra-title">Scrobblings</span>
          <span class="extra-info">{{ album.playcount | humanNumber }}</span>
        </div>

        <div class="tags">
          <Tags v-if="hasTags" :tags="tags" />
        </div>
      </div>

      <div class="float-box">
        <Wiki :album="album" />

        <Tracks v-if="hasTracks" :tracks="tracks" :image="imageUrl" />
      </div>

      <a :href="moreLink" target="_blank">More information</a>
    </div>
  </section>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import Tags from '@/components/Tags.vue';
import Wiki from '@/components/album/Wiki.vue';
import Tracks from '@/components/album/Tracks.vue';

export default {
  name: 'AlbumDetail',
  components: {
    Spinner, Tags, Wiki, Tracks
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
    imageUrl () {
      return this.loading ? '' : this.album.image[3]['#text'];
    },
    moreLink () {
      return this.loading ? '' : this.album.url;
    },
    tags () {
      return !this.album.tags || !this.album.tags.tag ? [] : this.album.tags.tag;
    },
    hasTags () {
      return this.tags.length > 0;
    },
    tracks () {
      return !this.album.tracks || !this.album.tracks.track ? [] : this.album.tracks.track;
    },
    hasTracks () {
      return this.tracks.length > 0;
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
      console.log(this.$route.params);
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
      });
    }
  }
}
</script>

<style lang="less">
.artist-detail {
  position: relative;
}
</style>
