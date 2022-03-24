<script lang="ts" setup>
import { computed, inject, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useChatsStore } from '@/stores/chatsStore';
import { Chats } from '@/services/ChatsService';

import ChatsListItem from '@/components/chat/ChatsListItem.vue';
import VEmpty from '@/components/kit/VEmpty.vue';

const chatsStore = useChatsStore();
const router = useRouter();

const chats = computed<Chats>(() => chatsStore.chats ?? []);

const openedChatId = ref(-1);

const onOpenHandler = async (chatId: number) => {
  openedChatId.value = chatId;
  await router.push(`/chats/${chatId}`);
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { isChatOpenedChangeState } = inject('isChatOpened') ?? { isChatOpenedChangeState: null };

const chatsItemClickHandler = () => {
  if (isChatOpenedChangeState !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    isChatOpenedChangeState(true);
  }
};
</script>

<template>
  <v-empty v-if="chats.length === 0">
    Нет начатых бесед...
  </v-empty>

  <div v-else class="chats-list">
    <chats-list-item
      v-for="chat in chats"
      :key="chat.conversation.peer.id"
      :chat="chat"
      @click="chatsItemClickHandler"
    />
  </div>
</template>

<style lang="scss" scoped>
.chats-list {
  padding: 0.5rem 0 0 0;
  overflow-y: auto;

  @media (min-width: 927px) {
    padding: 0.5rem 0.5rem 0 0.5rem;
  }
}
</style>
