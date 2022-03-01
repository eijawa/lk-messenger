<template>
  <base-list-item
    render-tag="li"
    :avatar-src="chat.avatarSrc"
    :title="chat.title"
    :text="chat.lastMessage?.text"
    is-hovered
    :is-focused="isOpened"
    @click="onClickHandler"
  >

    <template #info>
      <readed-label v-if="isYourMessage" :is-readed="chat.lastMessage?.isReaded"></readed-label>
      <date-label :date="chat.lastMessage?.date"></date-label>
    </template>

    <template #prefix>
      <attachment
        v-if="chat.lastMessage?.attachment != null"
        :attachment="chat.lastMessage?.attachment"
        is-minified
      />
    </template>

    <template #suffix>
      <a-tag v-if="chat.newMessagesCount != 0" class="chat__count">{{ chat.newMessagesCount }}</a-tag>
    </template>

  </base-list-item>
</template>

<script setup>
import { computed } from 'vue';

import Attachment from '@/components/kit/Labels/Attachment.vue';
import ReadedLabel from '@/components/kit/Labels/ReadedLabel.vue';
import DateLabel from '@/components/kit/Labels/DateLabel.vue';
import BaseListItem from '@/components/base/BaseListItem.vue';

const props = defineProps({
  chat: {
    type: Object,
    required: true,
    default: () => { },
  },
  convid: {
    type: Number,
    default: 0,
  },
  isOpened: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['open']);

const isYourMessage = computed(() => true);

const onClickHandler = () => {
  emits('open', props.convid);
};
</script>

<style lang="scss" scoped>
.ant-tag {
  margin-right: 0;

  border-radius: 50%;
}
</style>
