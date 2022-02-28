<template>
  <div class="messenger">
    <div class="messenger-sidebar">
      <sidebar-header
        @search-focus="searchStateChange(true)"
        @back-click="searchStateChange(false)"
        @search="onSearch"
      />

      <chats-list v-if="!isSearchActive" />
      <messenger-search v-else :date="searchDate" />

      <new-chat-btn />
    </div>
    <div class="messenger-main" :class="{ 'messenger-main-opened': isChatOpened }">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useMessengerSettingsStore } from '@/stores/messengerSettingsStore';
import { useChatsStore } from '@/stores/chatsStore';
import SidebarHeader from '@/components/SidebarHeader.vue';
import MessengerSearch from '@/components/MessengerSearch.vue';
import ChatsList from '@/components/ChatsList.vue';
import NewChatBtn from '@/components/NewChatBtn.vue';
import { SearchService } from '@/services/SearchService';
import { ChatsService } from '@/services/ChatsService';
const messengerSettingsStore = useMessengerSettingsStore();
const chatsStore = useChatsStore();
const searchService = new SearchService();
const chatsService = new ChatsService();
const searchDate = ref({
  users: [],
  chats: [],
  messages: [],
});
const isSearchActive = ref(false);
const isChatOpened = computed(() => messengerSettingsStore.isChatOpened);
const searchStateChange = state => {
  isSearchActive.value = state;
  searchDate.value = {
    users: [],
    chats: [],
    messages: [],
  };
};
const onSearch = async query => {
  if (query) {
    const data = await searchService.messengerSearch(query);
    searchDate.value = data.result;
  }
};
onMounted(async () => {
  await messengerSettingsStore.fetchUserInfo();
  const chatsData = await chatsService.getChats();
  chatsStore.$patch({
    chats: chatsData.result,
  });
});
</script>

<style lang="scss" scoped>
.messenger {
  display: flex;
  .messenger-sidebar {
    position: relative;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-height: 100vh;
    width: 100%;
  }
  .messenger-main {
    display: flex;
    height: 100vh;
    max-width: none;
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    transform: translate3d(0, 0, 0);
    transition: 300ms cubic-bezier(0.8, 1, 0.68, 1);
    background-color: #f0f2f5;
  }
  .messenger-main:not(.messenger-main-opened) {
    transform: translate3d(100vw, 0, 0);
  }
  @media (min-width: 927px) {
    .messenger-main {
      position: relative;
      left: unset;
      top: unset;
      bottom: unset;
      right: unset;
      transform: unset;
    }
    .messenger-main:not(.messenger-main-opened) {
      transform: unset;
    }
    .messenger-sidebar {
      width: 420px;
    }
  }
}
</style>
