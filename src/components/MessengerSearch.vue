<template>
  <div class="messenger-search">
    {{ usersAndChats }}
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  date: {
    type: Object,
    required: true,
  },
});

const usersAndChats = computed(() => props.date.users);
const messages = computed(() => props.date.messages);
</script>

<style lang="scss" scoped></style>
