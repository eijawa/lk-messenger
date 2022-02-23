<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex'

const store = useStore();

const conversations = computed(() => store.state.conversationsModule.state.conversations);
</script>

<template>
  <a-empty v-if="conversations.length === 0">
    <template #description>Нет начатых бесед...</template>
  </a-empty>

  <perfect-scrollbar class="chat-list">
    <router-link
        v-for="(c, index) in conversations"
        :key="index"
        :to="`/convs/${index}`"
    >
      <conversations-list-item
          :cover-src="c.coverSrc"
          :title="c.title"
          :last-message="c.lastMessage"
          :new-messages-count="c.newMessagesCount"
      ></conversations-list-item>
    </router-link>
  </perfect-scrollbar>
</template>

<style lang="scss" scoped>
.chat-list {
  overflow-y: auto;
}
</style>