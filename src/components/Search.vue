<template>
  <form class="search-wrapper card" @submit.prevent="onSubmit">
    <InputText name="search" placeholder="Search tracks or artists…" @change="setSearch" @reset="reset" />

    <Selector extra-class="type-wrapper" :elements="types" :initial="startingType" @change="changeType" />

    <Button icon="fa-search" text="Search" type="submit" />
  </form>
</template>

<script>
import InputText from '@/components/common/InputText.vue';
import Selector from '@/components/common/Selector.vue';
import Button from '@/components/common/Button.vue';

export default {
  name: 'Search',
  components: { InputText, Selector, Button },
  data () {
    return {
      search: '',
      type: 'track',
      old: { search: '', type: 'track' },
      types: [
        { name: 'Tracks', value: 'track' },
        { name: 'Albums', value: 'album' },
        { name: 'Artists', value: 'artist' }
      ]
    };
  },
  computed: {
    isActive () {
      return this.search !== undefined && this.search !== null && this.search !== '';
    },
    startingType () {
      return this.types[0].value;
    }
  },
  methods: {
    setSearch: function (search) {
      this.search = search;
    },
    changeType: function (type) {
      this.type = type;
    },
    saveSearchParams: function () {
      this.old.search = this.search;
      this.old.type = this.type;
    },
    isRepeatedSearch: function () {
      return (this.search === this.old.search && this.type === this.old.type);
    },
    onSubmit: function (event) {
      if (this.isRepeatedSearch()) return;
      this.saveSearchParams();

      if (this.search) {
        this.$emit('search', this.search, this.type);
      } else {
        this.$emit('resetSearch');
      }
    },
    reset: function (event) {
      this.search = '';
      this.onSubmit();
    }
  }
};
</script>

<style lang="less">
@import (reference, less) "../assets/styles/colors.less";

.search-wrapper {
  padding: 10px 20px;

  .type-wrapper {
    display: inline-block;
    margin: 0 5px;
  }
}
</style>
