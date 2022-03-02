<template>
  <base-list-item is-rounded>
    <chat-card
      :avatar-src="chat.avatarSrc"
      :title="chat.title"
      :university-pallete="chat.type === 'tat' ? chat.members[0].university : ''"
      :chat-type="chat.type"
      :is-teacher="chat.type === 'tat' && chat.members[0].type === 'teacher'"
      :is-active="isOpened"
      @click="onClickHandler"
    >

      <template #meta>
        <labels-group>
          <readed-label v-if="isYourMessageReaded"></readed-label>
          <date-label :date="chat.lastMessage?.date"></date-label>
        </labels-group>
      </template>

      <template #prefix>
        <attachment
          v-if="chat.lastMessage?.content.type != 'text'"
          :attachment-src="chat.lastMessage?.content.value"
          is-minified
        />
      </template>

      <template #text>
        <span v-if="chat.lastMessage?.content.type === 'text'">{{ chat.lastMessage?.content.value }}</span>
        <span v-else-if="chat.lastMessage?.content.type === 'image'">Изображение</span>
        <span v-else>{{ atta.fileName }}</span>
      </template>

      <template #suffix>
        <a-tag v-if="chat.newMessagesCount != 0" class="chat__count">{{ chat.newMessagesCount }}</a-tag>
      </template>

    </chat-card>
  </base-list-item>
</template>

<script setup>
import { computed } from 'vue';

import LabelsGroup from '@/components/kit/Labels/LabelsGroup.vue';
import Attachment from '@/components/kit/Labels/Attachment.vue';
import ReadedLabel from '@/components/kit/Labels/ReadedLabel.vue';
import DateLabel from '@/components/kit/Labels/DateLabel.vue';
import BaseListItem from '@/components/base/BaseListItem.vue';
import ChatCard from '@/components/kit/Cards/ChatCard.vue';

import { getAttachmentInfo } from '@/helpers/attachmentHelper';

import { useMessengerSettingsStore } from '@/stores/messengerSettingsStore';

const props = defineProps({
  chat: {
    type: Object,
    required: true,
    default: () => { },
  },
  isOpened: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['open']);

const messengerSettingStore = useMessengerSettingsStore();

const isYourMessageReaded = computed(() => props.chat?.lastMessage.owner.id === messengerSettingStore.user.id && props.chat?.lastMessage.readedBy.length !== 0);

const atta = computed(() => props.chat?.lastMessage.content.type !== 'text' ? getAttachmentInfo(props.chat?.lastMessage.content.value) : '');

const onClickHandler = () => {
  emits('open', props.chat.id);
};
</script>

<style lang="scss" scoped>
.ant-tag {
  margin-right: 0;

  border-radius: 50%;
}
</style>
