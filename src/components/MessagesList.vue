<template>
  <a-empty v-if="messages?.length === 0" />
  <a-space
    v-else
    direction="vertical"
  >
    <messages-list-item
      v-for="m in messages"
      :key="m.id"
      :message="m"
    />
  </a-space>
</template>

<script setup>
import MessagesListItem from '@/components/MessagesListItem.vue';

defineProps({
  messages: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
</style>
