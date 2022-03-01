<template>
  <div class="labels-group" :class="{ 'reverse': isReverse, 'background': isHaveBackground }">
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  isHaveBackground: {
    type: Boolean,
    default: false,
  },
  isReverse: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
  .labels-group {
    padding: 0 0.365rem;

    display: flex;
    place-items: center;
    column-gap: 0.125rem;

    float: right;

    &.background {
      background: rgba(0, 0, 0, 0.2);
    }

    &.reverse {
      flex-direction: row-reverse;
    }
  }
</style>