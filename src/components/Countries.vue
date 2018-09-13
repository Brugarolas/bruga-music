<template>
  <Selector :starting="'spain'" :elements="countries" @change="changeCountry"/>
</template>

<script>
import Selector from '@/components/common/Selector.vue';

export default {
  name: 'Countries',
  components: { Selector },
  data () {
    return {
      countries: [
        { name: 'Argentina', value: 'argentina' },
        { name: 'Colombia', value: 'colombia' },
        { name: 'España', value: 'spain' }
      ]
    };
  },
  methods: {
    changeCountry: function (country) {
      this.$emit('change', country);
    }
  }
};
</script>
