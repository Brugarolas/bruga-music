<template>
  <button class="input-button" :class="[extraClass]" :type="computedType" @click="onClick">
    <i class="fas" :class="[icon]" />
    <span>{{ text }}</span>
  </button>
</template>

<script>
const BUTTON_TYPES = ['button', 'submit', 'reset'];
const DEFAULT_TYPE = BUTTON_TYPES[0];

export default {
  name: 'Button',
  props: {
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: DEFAULT_TYPE
    },
    icon: {
      type: String,
      default: 'fa-dot-circle'
    },
    extraClass: {
      type: String,
      default: undefined
    },
    onClick: {
      type: Function,
      default: () => {}
    }
  },
  computed: {
    computedType () {
      return BUTTON_TYPES.includes(this.type) ? this.type : DEFAULT_TYPE;
    }
  }
};
</script>

<style lang="less">
@import (reference, less) "../../assets/styles/colors.less";

.input-button {
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
    background-color: @main-light-color;
    border-color: @main-light-color;
    transition: all .1s ease-in-out;
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
    border-color: @main-light-color;
    transition: all .1s ease-in-out;
  }
}
</style>
