<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'

import MessagesList from '../components/MessagesList.vue'
import UploadFileBtn from '../components/UploadFileBtn.vue'
import MessageInput from '../components/MessageInput.vue'

const store = useStore();

const route = useRoute();

const conversation = computed(() => store.state.conversationsModule.state.conversations[route.params.id]);

const siderWidth = 300;

const layoutStyle = {
  'margin-left': siderWidth + 'px'
};

const layoutHeaderStyle = {
  'width': '100%',
  'padding': '1rem 1.25rem',
  'display': 'inline-flex',
  'place-items': 'center',
  'place-content': 'space-between'
};

const layoutContentStyle = {
  'padding': '1rem 1.25rem'
};
</script>

<template>
  <a-layout :style="layoutStyle">
    <!-- Chat Controls -->
    <a-layout-header :style="layoutHeaderStyle">{{ conversation.title }}</a-layout-header>

    <!-- Messages -->
    <perfect-scrollbar>
      <a-layout-content :style="layoutContentStyle">
        <messages-list
          :messages="conversation?.messages"
        ></messages-list>
      </a-layout-content>
    </perfect-scrollbar>

    <!-- Message box and etc. -->
    <a-layout-footer>
      <a-space>
        <!-- Upload File -->
        <upload-file-btn></upload-file-btn>

        <!-- Message Input -->
        <message-input></message-input>
      </a-space>
    </a-layout-footer>
  </a-layout>
</template>

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