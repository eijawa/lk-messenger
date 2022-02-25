<template>
  <a-layout>
    <div class="chat-header">
      <chat-header :chat="chat" @open-info="openInfoDrawerHandler"></chat-header>
    </div>

    <a-layout-content :style="layoutContentStyle">
      <messages-list :messages="chat?.messages"></messages-list>
    </a-layout-content>

    <a-layout-footer>
      <a-space>
        <upload-file-btn></upload-file-btn>
        <message-input></message-input>
      </a-space>
    </a-layout-footer>
  </a-layout>

  <a-drawer
    title="Свойства чата"
    placement="right"
    :closable="true"
    :visible="visible"
    :wrap-style="{ position: 'absolute' }"
    @close="onClose"
  >
    <p>Тут будет информация о чате</p>
    <p>А ещё поиск внутри чата</p>
  </a-drawer>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMessengerSettingsStore } from '../stores/messengerSettingsStore';
import { useChatsStore } from '../stores/chatsStore';

import ChatHeader from '../components/ChatHeader.vue';
import MessagesList from '../components/MessagesList.vue';
import UploadFileBtn from '../components/UploadFileBtn.vue';
import MessageInput from '../components/MessageInput.vue';

const messengerSettingsStore = useMessengerSettingsStore();
const chatsStore = useChatsStore();
const route = useRoute();

const chat = computed(() => chatsStore.chats[route.params.id]);

const layoutContentStyle = {
  'padding': '1rem 1.25rem',
};

const visible = ref(false);
const openInfoDrawerHandler = () => {
  visible.value = true;
};

const onClose = () => {
  visible.value = false;
};

messengerSettingsStore.$patch({
  isChatOpened: true,
});

onBeforeUnmount(() => {
  messengerSettingsStore.$patch({
    isChatOpened: false,
  });
});
</script>

<style lang="scss" scoped>
.ps {
  height: 100vh;
}

.ant-space {
  width: 100%;

  :deep(.ant-space-item:last-of-type) {
    width: 100%;
  }
}
</style>
