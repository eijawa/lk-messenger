<template>
  <component
    :is="renderTag"
    class="chat"
    :class="{ 'hovered': isHovered, 'focused': isFocused }"
  >
    <div>
      <a-avatar
        class="chat__avatar"
        :src="avatarSrc"
        shape="circle"
        :size="avatarSize"
      >
        {{ titleFirstLetters }}
      </a-avatar>
    </div>

    <div class="chat__content">
      <div class="chat__header">
        <span class="chat__title typo" :title="title">{{ title }}</span>

        <div class="chat__info">
          <slot name="info"></slot>
        </div>
      </div>

      <div class="chat__footer">
        <slot name="prefix"></slot>

        <span class="chat__text typo">
          <slot name="text">
            {{ text }}
          </slot>
        </span>

        <slot name="suffix"></slot>
      </div>
    </div>
  </component>
</template>

<script setup>
import { computed } from 'vue';

import getFirstLetters from '@/helpers/firstLettersHelper';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  avatarSrc: {
    type: String,
    default: '',
  },
  avatarSize: {
    type: Number,
    default: 54,
  },
  text: {
    type: String,
    default: '',
  },
  isHovered: {
    type: Boolean,
    default: false,
  },
  isFocused: {
    type: Boolean,
    default: false,
  },
  renderTag: {
    type: String,
    default: 'li',
  },
});

// Avatar functions
const titleFirstLetters = computed(() => getFirstLetters(props.title));
</script>

<style lang="scss" scoped>
.chat {
  --column-gap: 0.5rem;

  padding: 0.5rem;

  display: flex;
  place-items: center;
  column-gap: var(--column-gap);

  border-radius: 0.75rem;

  &__avatar {
    background: var(--color-gray);

    font-size: 1.15rem;
    font-weight: bold;
  }

  &__content {
    flex: 1 1 auto;

    overflow: hidden;
  }

  &__header,
  &__footer {
    display: flex;
    column-gap: var(--column-gap);
  }

  &__footer {
    color: var(--color-gray);
  }

  &__title,
  &__text {
    flex-grow: 1;
  }

  &__title {
    font-weight: bold;
    color: var(--color-black);
  }

  &__info {
    display: flex;
    place-items: center;
    column-gap: 0.25rem;

    color: var(--color-gray);
  }
}

.hovered {
  &:not(.focused):hover {
    background-color: var(--color-hover);

    cursor: pointer;
  }
}

.focused {
  background-color: var(--color-focus);

  .chat {
    &__title,
    &__footer,
    &__info {
      color: var(--color-text-focus);
    }
  }
}
</style>
