<template>
  <component
    :is="renderTag"
    class="chat"
    :class="{ 'hovered': isHovered, 'focused': isFocused }"
  >
    <div class="chat__avatar">
      <a-avatar
        :src="avatarSrc"
        shape="circle"
        :size="avatarSize"
        style="background:var(--volsu-u-eaf-gr); font-size: 1.15rem; font-weight: bold;"
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
    default: 'div',
  },
});

// Avatar functions
const titleFirstLetters = computed(() => getFirstLetters(props.title));
</script>

<style lang="scss" scoped>
.chat {
  --avatar-size: 54px;
  --column-gap: 0.5rem;

  padding: 0.5rem;

  display: flex;
  place-items: center;
  column-gap: var(--column-gap);

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
    color: var(--volsu-dark-gray);
  }

  &__title,
  &__text {
    flex-grow: 1;
  }

  &__title {
    font-weight: bold;
    color: var(--volsu-black);
  }

  &__info {
    display: flex;
    place-items: center;
    column-gap: 0.25rem;

    color: var(--volsu-dark-gray);
  }
}

.hovered {
  &:not(.focused):hover {
    background-color: var(--light-gray);

    cursor: pointer;
  }
}

.focused {
  background-color: var(--volsu-black);

  .chat {
    &__title,
    &__footer,
    &__info {
      color: white;
    }
  }
}
</style>
