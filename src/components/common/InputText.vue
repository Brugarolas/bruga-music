<template>
  <div class="input-wrapper" :class="[extraClass]">
    <input v-model="textModel" :class="{ completed: isActive }" :name="name" :placeholder="placeholder" type="text" class="input-text">
    <span class="reset-wrapper" @click="reset"><span class="button-reset">+</span></span>
  </div>
</template>

<script>
export default {
  name: 'InputText',
  props: {
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
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
      text: ''
    };
  },
  computed: {
    isActive () {
      return Boolean(this.textModel);
    },
    textModel: {
      get () {
        return this.text;
      },
      set (value) {
        this.text = value;
        this.$emit('change', value);
      }
    }
  },
  mounted () {
    if (this.initial) {
      this.text = this.initial;
    }
  },
  methods: {
    reset: function (event) {
      if (this.text === '') return;

      this.text = '';
      this.$emit('reset');
    }
  }
};
</script>

<style lang="less">
@import (reference, less) "../../assets/styles/colors.less";

.input-wrapper {
  display: inline-block;
  position: relative;

  &:hover .completed + .reset-wrapper {
    visibility: visible;
    opacity: 1;
  }
}

.input-text {
  font-family: 'Open Sans', sans-serif;
  padding: 5px;
  display: inline-block;
  width: 320px;
  border: 2px solid @main-light-color;
  border-radius: 4px;
  transition: all .3s ease-in-out;

  &:hover, &:focus, &.completed {
    border-color: @main-color;
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
</style>
