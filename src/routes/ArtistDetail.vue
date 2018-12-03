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

        <div v-if="hasTags" class="tags">
          <ul class="tag-list">
            <li v-for="tag in tags" :key="tag.name" class="tag">
              <span style="margin-right: 2px;">{{ tag.name | lowercase }}</span>
              <i class="fas fa-tag" />
            </li>
          </ul>
        </div>
      </div>

      <div class="float-box">
        <div class="main-content">
          <h4 class="title">Biography</h4>
          <div>{{ biography }}</div>

          <TopTracks :name="name" />
        </div>

        <div class="similar">
          <h4 class="title">Similar Artists</h4>

          <ul class="artist-list">
            <li v-for="similarArtist in artist.similar.artist" :key="similarArtist.name" class="artist-wrapper">
              <Artist :artist="similarArtist" />
            </li>
          </ul>
        </div>
      </div>
      <a :href="moreLink" target="_blank">More information</a>
    </div>
  </section>
</template>

<script>
import Spinner from '@/components/Spinner.vue';
import Artist from '@/components/Artist.vue';
import TopTracks from '@/components/artist/TopTracks.vue';

export default {
  name: 'ArtistDetail',
  components: {
    Spinner, Artist, TopTracks
  },
  data () {
    return {
      name: '',
      artist: {},
      tags: [],
      albums: [],
      initialized: false,
      loading: true
    };
  },
  computed: {
    imageUrl () {
      return this.loading ? '' : this.artist.image[4]['#text'];
    },
    biography () {
      if (this.loading) return '';

      let bio = this.artist.bio.summary || this.artist.bio.content;
      let index = bio.indexOf(' <a');
      return bio.substring(0, index);
    },
    moreLink () {
      return this.loading ? '' : this.artist.bio.links.link.href;
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
    this.searchArtistByMbid();
    next();
  },
  methods: {
    load () {
      this.name = this.$route.params.name;
      this.searchArtistByMbid();
    },
    reset () {
      // this.artist = {};
      this.tags = [];
      this.albums = [];
    },
    searchArtistByMbid () {
      this.loading = true;
      const name = this.name;
      this.reset();

      this.$lastfm.getArtistInfo(name).then(artist => {
        this.artist = artist;
        this.loading = false;
        this.initialized = true;
      });

      this.$lastfm.getArtistTopTags(name).then(tags => {
        this.tags = tags.slice(0, 5);
      });

      this.$lastfm.getArtistTopAlbums(name).then(albums => {
        this.albums = albums;
      });
    }
  }
};
</script>

<style lang="less">
@import (less, reference) "../assets/styles/colors.less";

.artist-detail {
  position: relative;

  .card {
    display: block;
    background-color: #fff;
    margin: 25px 10%;
    padding: 25px 5%;
    border-radius: 4px;
    box-shadow: 0 0 1/4rem 1/8rem rgba(0, 0, 0, 0.05);
  }

  .main-info {
    font-family: 'Roboto', sans-serif;
    display: block;
    text-align: left;
    margin-bottom: 20px;

    .image {
      display: inline-block;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      cursor: inherit;
      float: left;
      background-color: #ccc;
      box-sizing: border-box;
    }

    .name {
      font-size: 36px;
      display: inline-block;
      width: calc(100% - 600px);
      margin: 0;
      padding: 55px 0 0 10px;
      float: left;
      box-sizing: border-box;

      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .extra {
      display: inline-block;
      text-align: center;
      width: 150px;
      margin-top: 55px;
      float: left;
      box-sizing: border-box;

      .extra-title {
        display: block;
        text-transform: uppercase;
        font-size: 18px;
        letter-spacing: 0.75px;
        color: @color-light-letter;
        font-weight: 300;
      }
      .extra-info {
        display: block;
        font-family: 'Open Sans', sans-serif;
        font-size: 20px;
        letter-spacing: 0.75px;
        font-weight: 700;
      }
    }

    .tags {
      display: inline-block;
      width: 150px;
      float: right;
      font-size: 12px;
      vertical-align: 100%;
      text-align: right;
      margin: 0;
      margin-top: 5px;
      box-sizing: border-box;

      .tag {
        color: @color-white;
        background-color: @color-red;
        padding: 5px 10px;
        border-radius: 8px;
        margin: 2px;
      }
    }
  }

  .main-content {
    font-family: 'Open Sans', sans-serif;
    padding: 0 20px;
    font-size: 16px;
    text-align: justify;

    display: inline-block;
    width: 75%;
    box-sizing: border-box;
    float: left;
  }

  .title {
    display: block;
    text-transform: uppercase;
    font-size: 18px;
    letter-spacing: 0.75px;
    font-weight: 300;
    text-align: center;
  }

  .similar {
    display: inline-block;
    width: 25%;
    box-sizing: border-box;
    float: right;

    .artist-wrapper {
      display: block;
    }

    .artist {
      .name {
        font-size: 18px;
        letter-spacing: 0.5px;
      }

      .image {
        width: 87px;
        height: 87px;
        border-radius: 50%;
      }
    }
  }
}
</style>
