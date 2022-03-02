<template>
  <div class="messenger-search">
    <div class="search-header">
      <div class="search-header-title">Chats and Contacts</div>
      <div>Show more</div>
    </div>

    <div class="search-list">
      <base-list-item
        v-for="userOrChat in usersAndChats"
        :key="userOrChat.id"
        render-tag="div"
        is-rounded
        @click="onOpenHandler(userOrChat)"
      >
        <chat-card :title="userOrChat.username" />
      </base-list-item>
    </div>
  </div>
</template>

<script setup>
import ChatCard from '@/components/kit/Cards/ChatCard.vue';
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

// Чаты и беседы
const usersAndChats = computed(() => props.date.users);

// Поиск по сообщениям
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

  .search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 var(--default-horz-padding);
  }

  .search-scroll-container {
    padding: var(--default-horz-padding);
  }

  .search-section {
    display: flex;
    flex-direction: column;
    padding: 0 var(--default-horz-padding);
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
