<script lang="ts" setup>
import { useFirstLetters } from '@/hooks/useStringFormatter';
import { computed } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  size: {
    type: Number,
    default: 3.375,
  },
  src: {
    type: String,
    default: undefined,
  },
  status: {
    type: Boolean,
    default: null,
  },
});

const size = computed(() => `${props.size}rem`);
const titleFirstLetters = computed(() => useFirstLetters(props.title));
const srcValue = computed(() => props.src);
</script>

<template>
  <div class="v-avatar-container">
    <div class="v-avatar" :style="{ width: size, height: size }">
      <img
        v-if="typeof srcValue !== 'undefined'"
        :style="{ width: size, height: size }"
        :src="srcValue"
        alt="avatar"
      >
      <span v-else>{{ titleFirstLetters }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.v-avatar-container {
  --color-user: var(--color-primary);

  .v-avatar {
    display: flex;
    font-weight: bold;
    color: var(--color-white);
    border-radius: 50%;
    background: linear-gradient(var(--color-white) -125%, var(--color-user));
    white-space: nowrap;
    user-select: none;
    align-items: center;
    justify-content: center;
    font-size: 1.3125rem;

    img {
      border-radius: 50%;
    }
  }
}
</style>
