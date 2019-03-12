<template>
  <button class="delete-button" @click.once.stop.prevent="click">
    <i class="fas fa-times icon-delete" />
  </button>
</template>

<script>
export default {
  name: 'DeleteButton',
  methods: {
    click () {
      this.$emit('click');
    }
  }
};
</script>

<style lang="less">
@import (less, reference) "../../assets/styles/colors.less";

.delete-button {
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

  .icon-delete {
    font-size: 24px;
    color: @color-red;
    opacity: 0.35;
    transition: all 0.3s ease-in-out;
  }

  &:hover .icon-delete {
    opacity: 1;
  }
}
</style>
