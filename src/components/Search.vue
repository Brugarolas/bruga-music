<template>
  <form class="search-wrapper" @submit.prevent="onSubmit">
    <div class="input-wrapper">
      <input id="search" v-model="search" :class="{ completed: isActive }" name="search" type="text"
             class="input-search" placeholder="Search tracks or artists…">
      <span class="reset-wrapper" @click="onReset"><span class="button-reset">+</span></span>
    </div>
    <button class="button-search" type="submit">
      <i class="fas fa-search" />
      <span>Search</span>
    </button>
  </form>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      search: '',
      old: ''
    };
  },
  computed: {
    isActive () {
      return this.search !== undefined && this.search !== null && this.search !== '';
    }
  },
  methods: {
    onSubmit: function (event) {
      if (this.search === this.old) return;
      this.old = this.search;

      this.$emit('search', this.search);
    },
    onReset: function (event) {
      if (this.search === '') return;

      this.search = '';
      this.onSubmit();
    }
  }
};
</script>

<style lang="less">
@import (reference, less) "../assets/styles/colors.less";

.search-wrapper {
  display: block;
  position: relative;
  padding: 10px 20px;
  font-family: 'Roboto', 'Avenir', Helvetica, Arial, sans-serif;

  .input-search {
    font-family: 'Open Sans', sans-serif;
    padding: 5px;
    display: inline-block;
    width: 320px;
    border: 2px solid @main-light-color;
    transition: all .3s ease-in-out;

    &:hover, &:focus, &.completed {
      border-color: @main-color;
    }
  }

  .button-search {
    cursor: pointer;
    font-weight: 500;
    font-size: 15px;
    font-family: 'Roboto', sans-serif;
    position: relative;
    box-sizing: border-box;
    background-clip: border-box;
    border: 2px solid @main-color;
    background-color: @main-color;
    border-radius: 4px;
    padding: 5px 20px;
    color: @color-white;
    letter-spacing: 0.75px;
    transition: all .3s ease-in-out;

    &:hover {
      border-color: @main-dark-color;
      background-color: @main-dark-color;
    }

    &:active {
      background-color: @main-color;
    }

    &::after {
      content: '';
      width: calc(100% - 2px);
      height: calc(100% - 2px);
      padding: 1rem;
      border-radius: 4px;
      position: absolute;
      top: 50%;
      left: 50%;
      border: 2px solid @main-light-color;
      transform: translate(-50% , -50%);
      opacity: 0;
      pointer-events: none;
      box-sizing: content-box;
    }

    &:hover::after {
      padding: 0;
      border-color: @main-dark-color;
      transition: all .3s ease-in-out;
      opacity: 1;
    }

    &:active::after {
      border-color: @main-dark-color;
    }
  }

  .reset-wrapper {
    display: inline-block;
    box-sizing: border-box;
    background-color: @color-red;
    border-radius: 50%;
    width: 23px;
    height: 23px;
    padding-left: 2px;
    cursor: pointer;

    position: absolute;
    right: 6px;
    top: 4px;
    visibility: hidden;
    opacity: 0;
    transition: all .3s ease-in-out;

    .button-reset {
      display: inline-block;
      cursor: pointer;
      background: none;
      font-size: 21px;
      padding-right: 3px;
      border: none;
      color: @color-white;
      transform: rotate(45deg);
    }
  }

  .input-wrapper {
    display: inline-block;
    position: relative;

    &:hover .completed + .reset-wrapper {
      visibility: visible;
      opacity: 1;
    }
  }
}
</style>
