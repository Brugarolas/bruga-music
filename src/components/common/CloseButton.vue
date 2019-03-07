<template>
  <button class="cancel-button" @click="click">
    <i class="fas fa-times icon-cancel" />
  </button>
</template>

<script>
export default {
  name: 'CloseButton',
  props: {
    click: {
      type: Function,
      required: true
    }
  }
};
</script>

<style lang="less">
@import (less, reference) "../../assets/styles/colors.less";

.cancel-button {
  border: none;
  margin: 0;
  padding: 0;
  width: auto;
  overflow: visible;
  outline: none;
  text-decoration: none;
  background: transparent;
  cursor: pointer;

  /* Disables hightlight */
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  -webkit-tap-highlight-color: transparent;

  /* Corrects inability to style clickable `input` types in iOS */
  -webkit-appearance: none;

  /* Style */
  position: absolute;
  right: 10px;
  top: 5px;

  .icon-cancel {
    font-size: 24px;
    color: @color-red;
    opacity: 0.35;
    transition: all 0.3s ease-in-out;
  }

  &:hover .icon-cancel {
    opacity: 1;
  }
}
</style>
