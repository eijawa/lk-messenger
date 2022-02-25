<template>
  <a-layout>
    <div class="chat-header">
      <chat-header :chat="chat" @open-info="openInfoDrawerHandler"></chat-header>
    </div>

    <perfect-scrollbar>
      <a-layout-content :style="layoutContentStyle">
        <messages-list :messages="chat?.messages"></messages-list>
      </a-layout-content>
    </perfect-scrollbar>

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
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import ChatHeader from '../components/ChatHeader.vue'
import MessagesList from '../components/MessagesList.vue'
import UploadFileBtn from '../components/UploadFileBtn.vue'
import MessageInput from '../components/MessageInput.vue'

const store = useStore();
const route = useRoute();

const chat = computed(() => store.state.chatsModule.state.chats[route.params.id]);

const layoutContentStyle = {
  'padding': '1rem 1.25rem'
};

const visible = ref(false);
const openInfoDrawerHandler = () => {
  visible.value = true;
};

const onClose = () => {
  visible.value = false;
};

store.dispatch('openChat');

onBeforeUnmount(() => {
  store.dispatch('closeChat');
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