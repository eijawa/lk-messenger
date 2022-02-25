<script setup>
// Вынес в отдельный компонент, чтобы потом было удобнее править и везде всё было одинаковым

const props = defineProps({
  isReaded: {
    type: Boolean,
    required: true,
    default: false
  }
});
</script>

<template>
  <font-awesome-icon :icon="['fas', 'circle-check']" size="sm" color="#52c41a" />
</template>

<style lang="scss" scoped>
</style>