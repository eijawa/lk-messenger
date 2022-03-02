<template>
  <component
    :is="renderTag"
    class="list-item"
    :class="{ `size-${size}`, "vertical": isVertical, "rounded": isRounded }"
  >
    <div class="list-item__prefix">
      <slot name="prefix"></slot>
    </div>

    <div class="list-item__content">
      <slot></slot>
    </div>
  </component>
</template>

<script setup>
defineProps({
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
