<template>
  <button class="v-button-base" :class="[typeValue, fluidValue, circleValue]">
    <slot />
  </button>
</template>

<script setup>

import { computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
  fluid: {
    type: Boolean,
    default: true,
  },
  circle: {
    type: Boolean,
    default: false,
  },
});

const typeValue = computed(() => props.type);
const fluidValue = computed(() => props.fluid ? 'fluid' : '');
const circleValue = computed(() => props.circle ? 'circle' : '');
</script>

<style lang="scss" scoped>
.v-button-base {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: var(--default-line-height);
  outline: none;
  margin: 0;
  cursor: pointer;
  overflow: hidden;
  text-decoration: none;
  user-select: none;

  &.default {
    background-color: #ffffff;
  }

  &.fluid {
    width: auto;
  }

  &.circle {
    border-radius: 50%;
  }
}
</style>
