<template>
  <ul class="tag-list">
    <li v-for="tag in tags" :key="tag.name" class="tag">
      <span style="margin-right: 2px;">{{ tag.name | lowercase }}</span>
      <i class="fas fa-tag" />
    </li>
  </ul>
</template>

<script>
export default {
  name: 'Tags',
  props: {
    tags: {
      type: Array,
      required: true
    }
  }
};
</script>
