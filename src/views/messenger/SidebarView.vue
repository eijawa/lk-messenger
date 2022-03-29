<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { NScrollbar } from 'naive-ui';

import SidebarHeader from '@/components/SidebarHeader.vue';
import MessengerSearch from '@/components/MessengerSearch.vue';
import ChatsList from '@/components/chat/ChatsList.vue';
import NewChatButton from '@/components/NewChatButton.vue';
import { SearchService } from '@/services/SearchService';
import { useChatsStore } from '@/stores/chatsStore';

const chatsStore = useChatsStore();

onMounted(async () => {
  await chatsStore.getChats();
});

const searchService = new SearchService();

// eslint-disable-next-line @typescript-eslint/require-await
const onSearch = async (query: string) => {
  console.log(query);
  // if (query) {
  //   const data = await searchService.messengerSearch(query);
  //   if (data?.status) {
  //     searchData.value.users = data.result.users;
  //   }
  //
  // } else {
  //   searchData.value = {
  //     users: [],
  //     chats: [],
  //     messages: [],
  //   };
  // }
};

const searchData = ref({
  users: [],
  chats: [],
  messages: [],
});
const isSearchActive = ref(false);
const searchStateChange = (state: boolean) => {
  isSearchActive.value = state;
  searchData.value = {
    users: [],
    chats: [],
    messages: [],
  };
};

const isSideBarScrolling = ref(false);
const sidebarScrollingHandler = (e: Event) => {
  isSideBarScrolling.value = (e.target as HTMLElement).scrollTop !== 0;
};
</script>

<template>
  <div class="messenger-sidebar">
    <sidebar-header
      class="v-sidebar-header"
      :class="{ 'scroll': isSideBarScrolling }"
      @search-focus="searchStateChange(true)"
      @back-click="searchStateChange(false)"
      @search="onSearch"
    />
    <div class="sidebar-header-menu-popover" />

    <div class="sidebar-list">
      <n-scrollbar class="sidebar-scrollbar" @scroll="sidebarScrollingHandler">
        <chats-list v-if="!isSearchActive" />
        <messenger-search v-else :date="searchData" />
      </n-scrollbar>
    </div>

    <new-chat-button />
    <div class="new-chat-popover" />
  </div>
</template>

<style lang="scss" scoped>
.messenger-sidebar {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .v-sidebar-header {
    transition: box-shadow, border-bottom-color .3s ease;
    background: var(--color-background);
  }

  .v-sidebar-header.scroll {
    box-shadow: 0 2px 2px var(--color-light-shadow);
  }

  .sidebar-list {
    flex: 1;
    overflow: hidden;
    contain: strict;

    :deep(.sidebar-scrollbar) {
      .n-scrollbar-rail {
        display: none;
        right: 0;
      }

      @media (min-width: 927px) {
        .n-scrollbar-rail {
          display: block;
        }
      }

      .n-scrollbar-content {
        display: flex;
        min-height: 100%;
      }
    }
  }
}
</style>
