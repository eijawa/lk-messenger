<template>
  <div class="chat-card">
    <div>
      <avatar
        :title="title"
        :size="avatarSize"
        :palette="universityPallete"
        :is-group="chatType === 'group'"
        :is-monochrome="isActive"
      />
    </div>

    <div class="chat-card__content">
      <div class="chat-card__header">
        <div class="chat-card__title typo">
          <font-awesome-icon v-if="isTeacher" :icon="['fas', 'graduation-cap']" title="Преподаватель" />
          <span :style="{ marginLeft: isTeacher ? '0.25rem' : '0' }" :title="title">{{ title }}</span>
        </div>

        <div class="chat-card__meta">
          <slot name="meta"></slot>
        </div>
      </div>

      <div class="chat-card__footer">
        <slot name="prefix"></slot>

        <span class="chat-card__text typo">
          <slot name="text">
            {{ text }}
          </slot>
        </span>

        <slot name="suffix"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

import Avatar from '@/components/kit/Avatar/Avatar.vue';

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
  isActive: {
    type: Boolean,
    default: false,
  },
});
</script>

<style lang="scss" scoped>
.chat-card {
  width: 100%;

  display: flex;
  place-items: center;
  column-gap: 0.5rem;

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

  &__meta {
    display: flex;
    place-items: center;
    column-gap: 0.25rem;

    color: var(--color-gray);

    fill: var(--color-green);
  }
}

.focused {
  background-color: var(--color-focus);

  .chat-card {
    &__title,
    &__footer,
    &__meta {
      color: var(--color-text-focus);
    }

    &__meta {
      fill: var(--color-text-focus);
    }
  }
}
</style>
