<template>
  <div class="country-selector-wrapper">
    <select v-model="selected" class="country-selector" @change="changeCountry">
      <option v-for="country in countries" :key="country.value" :value="country.value">{{ country.name }}</option>
    </select>
    <i class="country-selector-icon fas fa-angle-down" />
  </div>
</template>

<script>
export default {
  name: 'Countries',
  data () {
    return {
      countries: [
        { name: 'Argentina', value: 'argentina' },
        { name: 'Colombia', value: 'colombia' },
        { name: 'España', value: 'spain' }
      ],
      selected: 'spain'
    };
  },
  methods: {
    changeCountry: function (event) {
      this.$emit('change', event.target.value);
    }
  }
};
</script>

<style lang="less">
@import (less, reference) "../assets/styles/colors.less";

.country-selector-wrapper {
  position: relative;
  font-family: 'Open Sans', sans-serif;
  display: inline-block;
  cursor: pointer;
  background-color: @color-white;
  border-bottom: 2px solid @main-light-color;
  transition: all .3s ease-in-out;

  .country-selector {
    display: inline-block;
    padding: 2px 24px 2px 12px;
    cursor: pointer;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none; /* remove default arrow */
    border: none;
    background-color: transparent;
    font-size: 16px;
    letter-spacing: 0.75px;

    &::-ms-expand {
      display: none; /* hide the default arrow in ie10 and ie11 */
    }
  }
  .country-selector-icon {
    position: absolute;
    font-size: 20px;
    top: 4px;
    right: 8px;
    color: @main-light-color;
    transition: all .3s ease-in-out;
    pointer-events: none;
  }

  &:hover {
    border-bottom-color: @main-color;

    .country-selector-icon {
      color: @main-color;
    }
  }
}
</style>
