<template>
  <div class="selector-wrapper" :class="[extraClass]">
    <select v-model="selected" class="selector" @change="change">
      <option v-for="element in elements" :key="element.value" :value="element.value">{{ element.name }}</option>
    </select>
    <i class="selector-icon fas fa-angle-down" />
  </div>
</template>

<script>
export default {
  name: 'Selector',
  props: {
    elements: {
      type: Array,
      required: true
    },
    initial: {
      type: String,
      default: undefined
    },
    extraClass: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      selected: undefined
    };
  },
  mounted () {
    if (this.initial) {
      this.selected = this.initial;
    }
  },
  methods: {
    change: function (event) {
      this.$emit('change', event.target.value);
    }
  }
};
</script>

<style lang="less">
@import (less, reference) "../../assets/styles/colors.less";

.selector-wrapper {
  position: relative;
  font-family: 'Open Sans', sans-serif;
  display: inline-block;
  cursor: pointer;
  background-color: @color-white;
  border: 1px solid fade(@main-light-color, 20%);
  border-bottom: 2px solid @main-light-color;
  transition: all .3s ease-in-out;
  border-radius: 4px;

  .selector {
    display: inline-block;
    padding: 4px 24px 4px 12px;
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
  .selector-icon {
    position: absolute;
    font-size: 21px;
    top: 5px;
    right: 8px;
    color: @main-light-color;
    transition: all .3s ease-in-out;
    pointer-events: none;
  }

  &:hover {
    border-color: fade(@main-color, 20%);
    border-bottom-color: @main-color;

    .selector-icon {
      color: @main-color;
    }
  }
}
</style>
