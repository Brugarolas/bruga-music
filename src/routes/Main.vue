<template>
  <section class="view">
    <Search @search="onSearch" />

    <Countries @change="refreshArtist" />

    <Result :loading="loading" :results="results" :type="type" />
  </section>
</template>

<script>
import LastFM from '@/api/lastfm/services.js';
import Countries from '@/components/Countries.vue';
import Search from '@/components/Search.vue';
import Result from '@/components/Result.vue';

export default {
  name: 'Main',
  components: {
    Countries, Search, Result
  },
  data () {
    return {
      results: [],
      type: '',
      loading: true,
      country: 'spain'
    };
  },
  mounted () {
    this.refreshArtist();
  },
  methods: {
    refreshArtist (country = 'spain') {
      this.loading = true;
      this.country = country;

      LastFM.getTopArtists(country).then((artists) => {
        this.results = artists;
        this.type = 'artist';
        this.loading = false;
      });
    },
    onSearch (search) {
      if (search === '') { this.refreshArtist(this.country); return; }
      this.loading = true;

      LastFM.searchTrack(search).then((tracks) => {
        this.results = tracks;
        this.type = 'track';
        this.loading = false;
      });
    }
  }
};
</script>
