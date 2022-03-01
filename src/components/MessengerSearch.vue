<template>
  <div class="messenger-search">
    <div class="search-header">
      <div class="search-header-title">Chats and Contacts</div>
      <a-button type="text">Show more</a-button>
    </div>

    <div class="search-list">
      <base-list-item
        v-for="userOrChat in usersAndChats"
        :key="userOrChat.id"
        :title="userOrChat.username"
        is-hovered
        @click="onOpenHandler(userOrChat)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { useChatsStore } from '@/stores/chatsStore';
import BaseListItem from './base/BaseListItem.vue';

const router = useRouter();
const chatsStore = useChatsStore();

const props = defineProps({
  date: {
    type: Object,
    required: true,
  },
});

const usersAndChats = computed(() => props.date.users);

const messages = computed(() => props.date.messages);

const onOpenHandler = userOrChat => {
  chatsStore.$patch(state => {
    const chat = userOrChat;
    chat.title = chat.username;
    state.chats.push(userOrChat);
  });
  router.push(`/chats/${userOrChat.id}`);
};
</script>

<style lang="scss" scoped>
.messenger-search {
  overflow: hidden;
  height: 100%;

  .search-scroll-container {
    padding: 0.5rem;
  }

  .search-section {
    display: flex;
    flex-direction: column;
    padding: 0 0.5rem;
    border-top: 1px solid #DADCE0FF;
    overflow: hidden;
    height: 100%;
    overflow-y: auto;
    pointer-events: auto;

    .search-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
