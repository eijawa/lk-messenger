<template>
  <div>
    <h3>Поиск</h3>
    <base-chat-item
      v-for="(c, index) in searchedUsers"
      :key="index"
      :title="c.username"
      is-hovered
      @click="onOpenHandler(index)"
    >
    </base-chat-item>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useChatsStore } from '@/stores/chatsStore';

import BaseChatItem from './base/BaseChatItem.vue';

const router = useRouter();

const chatsStore = useChatsStore();

const searchedUsers = computed(() => chatsStore.searchedUsers);

const onOpenHandler = index => {
  chatsStore.$patch(state => {
    const chat = searchedUsers.value[index];
    chat.title = chat.username;
    console.log(chat);
    state.chats.push(chat);
  });

  router.push(`/chats/${searchedUsers.value[index].id}`);
};
</script>

<style lang="scss" scoped></style>
