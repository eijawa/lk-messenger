<template>
  <v-empty v-if="chats.length === 0">
    Нет начатых бесед...
  </v-empty>

  <div v-else class="chats-list">
    <chats-list-item
      v-for="chat in chats"
      :key="chat.conversation.id"
      :chat="chat"
      @click="chatsItemClickHandler(chat.conversation.id)"
    ></chats-list-item>
  </div>
</template>

<script setup>
import { useMessengerSettingsStore } from '@/stores/messengerSettingsStore';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useChatsStore } from '@/stores/chatsStore';

import ChatsListItem from '@/components/chat/ChatsListItem.vue';
import VEmpty from '@/components/kit/VEmpty.vue';

const chatsStore = useChatsStore();
const messengerSettingsStore = useMessengerSettingsStore();
const router = useRouter();

const chats = computed(() => chatsStore.chats ?? []);

const openedChatId = ref(-1);

const onOpenHandler = chatId => {
  openedChatId.value = chatId;
  router.push(`/chats/${chatId}`);
};

const chatsItemClickHandler = chatId => {
  messengerSettingsStore.$patch({
    isChatOpened: true,
  });
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
