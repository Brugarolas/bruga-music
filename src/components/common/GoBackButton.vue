<template>
  <a class="go-back-button" @click="goBack">
    <i class="bm-icon bm-icon-chevron-left-solid go-back-icon" />
  </a>
</template>

<script>
export default {
  name: 'GoBackButton',
  methods: {
    goBack () {
      this.$router.back();
    }
  }
};
</script>

<style lang="less">
.go-back-button {
  position: absolute;
  top: calc((100% - 90px) / 2);
  left: -8%;
  cursor: pointer;
  opacity: 0.35;
  transition: opacity 0.3s ease-in-out;

  &:hover {
    opacity: 1;
  }

  .go-back-icon {
    font-size: 72px;
  }
}
</style>
