<template>
  <li class="chat" :class="{'opened': isOpened}" @click="onClickHandler">
    <div class="chat__avatar">
      <a-avatar :src="chat.avatarSrc" shape="circle" :size="54" style="background-color:var(--volsu-yellow); font-size: 1.15rem; font-weight: bold;">{{ titleFirstLetters }}</a-avatar>
    </div>

    <div class="chat__content">
      <div class="chat__header">
        <span class="chat__title typo" :title="chat.title">{{ chat.title }}</span>

        <div class="chat__info">
          <readed-label v-if="isYourMessage" :is-readed="chat.lastMessage?.isReaded"></readed-label>
          <date-label :date="chat.lastMessage?.date"></date-label>
        </div>
      </div>

      <div class="chat__msg">
        <attachment v-if="chat.lastMessage?.attachment != null" :attachment="chat.lastMessage?.attachment" is-minified/>
        
        <span class="chat__text typo">{{ chat.lastMessage?.text }}</span>

        <a-tag
          v-if="chat.newMessagesCount != 0"
          class="chat__count"
        >{{ chat.newMessagesCount }}</a-tag>
      </div>
    </div>
  </li>
</template>

<script setup>
import { computed } from 'vue'

import Attachment from './kit/Attachment.vue'
import ReadedLabel from './kit/ReadedLabel.vue'
import DateLabel from './kit/DateLabel.vue'

import getFirstLetters from '../helpers/firstLettersHelper'

const props = defineProps({
  chat: {
    type: Object,
    required: true,
    default: () => { }
  },
  convid: {
    type: Number,
    default: 0
  },
  isOpened: {
    type: Boolean,
    default: false
  }
});

const emits = defineEmits(['open']);

const isYourMessage = computed(() => true);

const onClickHandler = () => {
  emits('open', props.convid);
};

// Avatar functions
const titleFirstLetters = computed(() => getFirstLetters(props.chat.title));
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
  &__msg {
    display: flex;
    column-gap: var(--column-gap);
  }

  &__title,
  &__text {
    flex-grow: 1;
  }

  &__title {
    font-weight: bold;
    color: var(--volsu-black);
  }

  &__msg {
    color: var(--volsu-dark-gray);
  }

  &__info {
    display: flex;
    place-items: center;
    column-gap: 0.25rem;

    color: var(--volsu-dark-gray);
  }

  .ant-tag {
    margin-right: 0;

    border-radius: 50%;
  }

  &:not(.opened):hover {
    background-color: var(--light-gray);

    cursor: pointer;
  }

  &.opened {
    background-color: var(--volsu-black);
  }

  &.opened &__title,
  &.opened &__msg,
  &.opened &__info {
    color: white;
  }
}
</style>