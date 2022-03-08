<template>
  <v-empty v-if="chats.length === 0">
    Нет начатых бесед...
  </v-empty>

  <div v-else class="chats-list">
    <chats-list-item
      v-for="c in chats"
      :key="c.id"
      :is-opened="openedChatId === c.id"
      :chat="c"
      @open="onOpenHandler"
    ></chats-list-item>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useChatsStore } from '@/stores/chatsStore';

import ChatsListItem from '@/components/ChatsListItem.vue';
import VEmpty from '@/components/kit/VEmpty.vue';

const chatsStore = useChatsStore();
const router = useRouter();

const chats = computed(() => chatsStore.chats ?? []);

const openedChatId = ref(-1);

const onOpenHandler = chatId => {
  openedChatId.value = chatId;
  router.push(`/chats/${chatId}`);
};
</script>

<style lang="scss" scoped>
.chats-list {
  padding: 0.5rem 0 0 0;
  overflow-y: auto;

  @media (min-width: 927px) {
    padding: 0.5rem 0.5rem 0 0.5rem;
  }
}
</style>
