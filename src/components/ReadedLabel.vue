<script setup>
import { CheckCircleTwoTone } from '@ant-design/icons-vue'

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
  <check-circle-two-tone v-if="isReaded" two-tone-color="#52c41a" />
</template>

<style lang="scss" scoped>
</style>