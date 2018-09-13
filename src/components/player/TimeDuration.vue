<template>
  <span class="time-duration">{{ time | duration }} / {{ duration | duration }}</span>
</template>

<script>
export default {
  name: 'TimeDuration',
  props: {
    time: {
      type: Number,
      required: true
    },
    duration: {
      type: Number,
      required: true
    }
  }
};
</script>

<style lang="less">
.time-duration {
  display: block;
  width: 100%;
  text-align: center;
  font-family: "Open Sans", sans-serif;
  font-size: 16px;
  margin-top: 2px;
  font-weight: 400;
}
</style>
