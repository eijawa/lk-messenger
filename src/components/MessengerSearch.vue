<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { useRouter } from 'vue-router';

import { useChatsStore } from '@/stores/chatsStore';
import { Search } from '@/types/Search';
import VButton from '@/components/kit/VButton.vue';

const router = useRouter();
const chatsStore = useChatsStore();

const props = defineProps({
  date: {
    type: Object as PropType<Search>,
    required: true,
  },
});

// Чаты и беседы
const usersAndChats = computed(() => props.date.chatsAndContacts);

const onOpenHandler = (userOrChat: any) => {
  // chatsStore.$patch(state => {
  //   const chat = userOrChat;
  //   chat.title = chat.username;
  //   state.chats.push(userOrChat);
  // });
  // router.push(`/chats/${userOrChat.id}`);
};
</script>

<template>
  <div class="messenger-search">
    <div class="search-header">
      <div class="search-header-title">
        Chats and Contacts
      </div>
      <v-button type="primary" text>
        Show more
      </v-button>
    </div>
    <div class="search-body">

    </div>
  </div>
</template>

<style lang="scss" scoped>
.messenger-search {
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding: 0.5rem 0.5rem 0 0.5rem;

  .search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .search-header-title {
      color: var(--color-text-secondary);
      font-weight: 500;
    }
  }
}
</style>
