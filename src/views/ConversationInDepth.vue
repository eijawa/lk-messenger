<script setup>
import { computed, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import MessagesList from '../components/MessagesList.vue'
import UploadFileBtn from '../components/UploadFileBtn.vue'
import MessageInput from '../components/MessageInput.vue'

const store = useStore();
const route = useRoute();

const conversation = computed(() => store.state.conversationsModule.state.conversations[route.params.id]);

const layoutContentStyle = {
  'padding': '1rem 1.25rem'
};

store.dispatch('openChat');

onBeforeUnmount(() => {
  store.dispatch('closeChat');
});
</script>

<template>
  <a-layout>
    <div class="chat-header">
      <router-link to="/">
        <div>Назад</div>
      </router-link>
      <div>{{ conversation.title }}</div>
    </div>

    <perfect-scrollbar>
      <a-layout-content :style="layoutContentStyle">
        <messages-list
          :messages="conversation?.messages"
        ></messages-list>
      </a-layout-content>
    </perfect-scrollbar>

    <a-layout-footer>
      <a-space>
        <upload-file-btn></upload-file-btn>
        <message-input></message-input>
      </a-space>
    </a-layout-footer>
  </a-layout>
</template>

<style lang="scss" scoped>
.chat-header {
  display: flex;
  gap: 100px;
}


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