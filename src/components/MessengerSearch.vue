<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';

import { useChatsStore } from '@/stores/chatsStore';

const router = useRouter();
const chatsStore = useChatsStore();

const props = defineProps({
  date: {
    type: Object,
    required: true,
  },
});

// Чаты и беседы
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const usersAndChats = computed(() => props.date.users);

// Поиск по сообщениям
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
const messages = computed(() => props.date.messages);

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
      <div class="search-header-title">Chats and Contacts</div>
      <div>Show more</div>
    </div>
  </div>
</template>

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
