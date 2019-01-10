<template>
  <section class="artist-detail">
    <Spinner v-if="loading" />

    <div v-if="initialized" class="card">
      <div class="main-info float-box">
        <img :src="imageUrl" class="image">
        <h1 class="name">{{ artist.name }}</h1>

        <div class="extra">
          <span class="extra-title">Listeners</span>
          <span class="extra-info">{{ artist.stats.listeners | humanNumber }}</span>
        </div>

        <div class="extra">
          <span class="extra-title">Scrobblings</span>
          <span class="extra-info">{{ artist.stats.playcount | humanNumber }}</span>
        </div>

        <div class="tags">
          <Tags v-if="hasTags" :tags="tags" />
          <TopTags v-if="!hasTags" :artist-name="name" />
        </div>
      </div>

      <div class="float-box">
        <div class="main-content">
          <Biography :artist="artist" />

          <TopTracks :artist-name="name" />

          <Albums :artist-name="name" />
        </div>

        <div class="additional-content">
          <Similar :artist="artist" />
        </div>
      </div>

      <a :href="moreLink" target="_blank">More information</a>
    </div>
  </section>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import Biography from '@/components/artist/Biography.vue';
import Tags from '@/components/Tags.vue';
import TopTags from '@/components/artist/TopTags.vue';
import TopTracks from '@/components/artist/TopTracks.vue';
import Albums from '@/components/artist/Albums.vue';
import Similar from '@/components/artist/Similar.vue';

export default {
  name: 'ArtistDetail',
  components: {
    Spinner, Biography, Tags, TopTags, TopTracks, Albums, Similar
  },
  data () {
    return {
      name: '',
      artist: {},
      initialized: false,
      loading: true
    };
  },
  computed: {
    imageUrl () {
      return this.loading ? '' : this.artist.image[4]['#text'];
    },
    moreLink () {
      return this.loading ? '' : this.artist.bio.links.link.href;
    },
    tags () {
      return !this.artist.tags || !this.artist.tags.tag ? [] : this.artist.tags.tag;
    },
    hasTags () {
      return this.tags.length > 0;
    }
  },
  activated () {
    this.load();
  },
  beforeRouteUpdate (to, from, next) {
    this.name = to.params.name;
    this.searchArtist();
    next();
  },
  methods: {
    load () {
      this.name = this.$route.params.name;
      this.searchArtist();
    },
    reset () {
      // this.artist = {};
    },
    searchArtist () {
      this.loading = true;
      const name = this.name;
      this.reset();

      this.$lastfm.getArtistInfo(name).then(artist => {
        this.artist = artist;
        this.loading = false;
        this.initialized = true;
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
