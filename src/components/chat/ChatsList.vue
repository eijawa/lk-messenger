<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useChatsStore } from '@/stores/chatsStore';
import { VMessengerListItemsType } from '@/types/VMessengerListItemType';

import VMessengerListItem from '@/components/kit/VMessengerListItem.vue';
import VEmpty from '@/components/kit/VEmpty.vue';

const chatsStore = useChatsStore();
const router = useRouter();

const chats = computed<VMessengerListItemsType>(() => (chatsStore.chats as VMessengerListItemsType)
  ?? []);

const openedChatId = ref(-1);

const chatsItemClickHandler = async () => {
  await router.push('/messenger/chat/313');
};
</script>

<template>
  <v-empty v-if="chats.length === 0">
    Нет начатых бесед...
  </v-empty>

  <div v-else class="chats-list">
    <v-messenger-list-item
      v-for="chat in chats"
      :key="chat.conversation.peer.id"
      :item="chat"
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
