<template>
  <component
    :is="renderTag"
    class="list-item"
    :class="[sizeClass, { 'vertical': isVertical, 'rounded': isRounded }]"
  >
    <slot></slot>
  </component>
</template>

<script setup>
const props = defineProps({
  renderTag: {
    type: String,
    default: 'li',
  },
  size: {
    type: String,
    default: 'default',
  },
  isRounded: {
    type: Boolean,
    default: false,
  },
  isVertical: {
    type: Boolean,
    default: false,
  },
});

const sizeClass = `size-${props.size}`;
</script>

<style lang="scss" scoped>
$sizes: (
  "sm": "0.25rem",
  "default": "0.5rem",
);

@each $sizeName, $size in $sizes {
  .list-item {
    &.size-#{$sizeName} {
      padding: #{$size};
    }
  }
};

.list-item {
  display: flex;
  place-items: center;
  column-gap: 0.5rem;

  &.vertical {
    flex-direction: column;
  }

  &.rounded {
    border-radius: 0.75rem;
  }

  &:hover {
    background-color: var(--color-hover);

    cursor: pointer;
  }
}
</style>
