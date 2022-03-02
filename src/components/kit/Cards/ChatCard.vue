<template>
  <component
    :is="renderTag"
    class="chat"
    :class="{ 'hovered': isHovered, 'focused': isFocused }"
  >
    <div>
      <a-avatar
        class="chat__avatar"
        :class="{ 'monochrome': isSetMonochromeAvatar }"
        :style="{ background: avatarBackgroundColor }"
        :src="avatarSrc"
        shape="circle"
        :size="avatarSize"
      >
        <span v-if="chatType === 'tat'">{{ titleFirstLetters }}</span>
        <font-awesome-icon v-else :icon="['fas', 'user-group']" />
      </a-avatar>
    </div>

    <div class="chat__content">
      <div class="chat__header">
        <div class="chat__title typo">
          <font-awesome-icon v-if="isTeacher" :icon="['fas', 'graduation-cap']" title="Преподаватель" />
          <span :style="{ marginLeft: isTeacher ? '0.25rem' : '0' }" :title="title">{{ title }}</span>
        </div>

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
  universityPallete: {
    type: String,
    default: '',
  },
  chatType: {
    type: String,
    default: 'tat',
  },
  text: {
    type: String,
    default: '',
  },
  isTeacher: {
    type: Boolean,
    default: false,
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

const avatarBackgroundColor = computed(() => props.universityPallete !== '' ? `var(--volsu-u-${props.universityPallete}-gr)` : 'var(--color-gray)');

const isSetMonochromeAvatar = computed(() => props.isFocused && props.chatType === 'group');

// Avatar functions
const titleFirstLetters = computed(() => getFirstLetters(props.title));
</script>

<style lang="scss" scoped>
.chat {
  padding: 0.5rem;

  display: flex;
  place-items: center;
  column-gap: 0.5rem;

  border-radius: 0.75rem;

  &__avatar {
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
    column-gap: 0.25rem;
  }

  &__footer {
    color: var(--color-gray);
  }

  &__title,
  &__text {
    flex-grow: 1;
  }

  &__title {
    display: inline;

    font-weight: bold;
    color: var(--color-black);
  }

  &__info {
    display: flex;
    place-items: center;
    column-gap: 0.25rem;

    color: var(--color-gray);

    fill: var(--color-green);
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

    &__info {
      fill: var(--color-text-focus);
    }

    &__avatar.monochrome {
      background: var(--color-white) !important;

      color: var(--color-black) !important;
    }
  }
}
</style>
