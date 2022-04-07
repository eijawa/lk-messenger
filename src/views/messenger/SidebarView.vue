<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { NScrollbar } from 'naive-ui';

import SidebarHeader from '@/components/SidebarHeader.vue';
import MessengerSearch from '@/components/search/MessengerSearch.vue';
import ChatsList from '@/components/chat/ChatsList.vue';
import NewChatButton from '@/components/NewChatButton.vue';
import { SearchService } from '@/services/SearchService';
import { Search } from '@/types/Search';

const searchService = new SearchService();

const searchData = ref<Search>({
  chatsAndContacts: [],
});

const onSearch = async (query: string) => {
  if (query) {
    const data = await searchService.messengerSearch(query);
    if (data?.status) {
      searchData.value.chatsAndContacts = data.result.chatsAndContacts;
    }
  } else {
    searchData.value = {
      chatsAndContacts: [],
    };
  }
};

const isSearchActive = ref(false);
const searchStateChange = (state: boolean) => {
  isSearchActive.value = state;
  if (!state) {
    searchData.value = {
      chatsAndContacts: [],
    };
  }
};

const isSideBarScrolling = ref(false);
const sidebarScrollingHandler = (e: Event) => {
  isSideBarScrolling.value = (e.target as HTMLElement).scrollTop !== 0;
};

onMounted(() => {
  console.log('mounted');
});
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
        <messenger-search v-else :search="searchData" />
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
  background-color: #ffffff;
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
