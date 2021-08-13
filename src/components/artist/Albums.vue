<template>
  <div v-if="ready" class="albums margin-top-xl">
    <h4 class="title">Albums</h4>

    <ul class="album-list flex-list">
      <Album v-for="album in visibleAlbums" :key="album.id" :album="album" :ignore-artist="true" />

      <li v-if="showSeeMore" class="see-more" @click="seeMore">
        <h2 class="see-more-text">See more</h2>
        <i class="see-more-icon fas fa-plus-square" />
      </li>
    </ul>
  </div>
</template>

<script>
import Album from '@/components/Album.vue';

export default {
  name: 'ArtistAlbums',
  components: {
    Album
  },
  props: {
    artistName: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMore: false
    };
  },
  asyncComputed: {
    async albums () {
      return this.$lastfm.getArtistTopAlbums(this.artistName);
    }
  },
  computed: {
    ready () {
      return Boolean(this.albums);
    },
    visibleAlbums () {
      return this.showMore ? this.albums : this.albums.slice(0, 6);
    },
    showSeeMore () {
      return !this.showMore && this.albums.length > 6;
    }
  },
  activated () {
    this.showMore = false;
  },
  methods: {
    seeMore () {
      this.showMore = true;
    }
  }
};
</script>

<style lang="less">
  .albums {
    .title {
      margin: 0;
    }

    .album-list {
      margin-top: 0;
    }
  }

  .see-more {
    width: 120px;
    padding: 5px;
    margin: 32px 0 5px 0;
    display: inline-block;
    box-sizing: border-box;
    vertical-align: top;
    cursor: pointer;
    background-color: #ccc0;

    .see-more-text {
      display: block;
      text-align: center;
      width: 100%;
      margin-bottom: 10px;
      font-size: 20px;
      max-height: 50px;
      overflow: hidden;
    }

    .see-more-icon {
      font-size: 128px;
      opacity: 0.5;
      transition: all 0.3s ease-in-out;
      overflow: hidden;
    }

    &:hover .see-more-icon {
      opacity: 0.75;
      transform: scale(1.1);
    }
  }
</style>
