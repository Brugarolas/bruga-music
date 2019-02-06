<template>
  <section class="view">
    <Search @search="onSearch" />

    <Result :loading="loading" :results="results" :type="type" :show-default-search="!hasSearch" @changeCountry="searchTopArtistByCountry" />
  </section>
</template>

<script>
import LastFM from '@/api/lastfm/services.js';
import Search from '@/components/Search.vue';
import Result from '@/components/Result.vue';

export default {
  name: 'Main',
  components: {
    Search, Result
  },
  data () {
    return {
      results: [],
      type: '',
      hasSearch: false,
      loading: true,
      country: 'spain'
    };
  },
  mounted () {
    this.searchTopArtistByCountry();
  },
  methods: {
    searchTopArtistByCountry (country = 'spain') {
      this.loading = true;
      this.hasSearch = false;
      this.country = country;

      LastFM.getTopArtists(country).then((artists) => {
        this.results = artists;
        this.type = 'artist';
        this.loading = false;
      });
    },
    onSearch (search, type = 'track') {
      if (search === '') {
        this.searchTopArtistByCountry(this.country);
        return;
      }
      this.loading = true;

      let searchFunction = LastFM.getSearchFunction(type);

      searchFunction(search).then((results) => {
        this.results = results;
        this.type = type;
        this.hasSearch = true;
        this.loading = false;
      });
    }
  }
};
</script>
