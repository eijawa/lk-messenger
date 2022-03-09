<template>
  <div class="messenger">
    <div class="messenger-sidebar">
      <sidebar-header
        class="v-sidebar-header"
        :class="{ 'scroll': isSideBarScrolling }"
        @search-focus="searchStateChange(true)"
        @back-click="searchStateChange(false)"
        @search="onSearch"
      />

      <n-scrollbar class="sidebar-scrollbar" @scroll="sidebarScrollingHandler">
        <chats-list v-if="!isSearchActive" />
        <messenger-search v-else :date="searchData" />
      </n-scrollbar>

      <new-chat-button />
      <div class="new-chat-popover"></div>
    </div>

    <div class="messenger-main" :class="{ 'messenger-main-opened': isChatOpened }">
      <router-view />
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { NScrollbar } from 'naive-ui';

import { useMessengerSettingsStore } from '@/stores/messengerSettingsStore';
import { useChatsStore } from '@/stores/chatsStore';
import SidebarHeader from '@/components/SidebarHeader.vue';
import MessengerSearch from '@/components/MessengerSearch.vue';
import ChatsList from '@/components/chat/ChatsList.vue';
import NewChatButton from '@/components/NewChatButton.vue';
import { SearchService } from '@/services/SearchService';

const messengerSettingsStore = useMessengerSettingsStore();
const chatsStore = useChatsStore();
const searchService = new SearchService();

const searchData = ref({
  users: [],
  chats: [],
  messages: [],
});

const isSearchActive = ref(false);

const isChatOpened = computed(() => messengerSettingsStore.isChatOpened);

const searchStateChange = async state => {
  isSearchActive.value = state;
  searchData.value = {
    users: [],
    chats: [],
    messages: [],
  };
};

const onSearch = async query => {
  if (query) {
    const data = await searchService.messengerSearch(query);
    if (data?.status) {
      searchData.value.users = data.result.users;
    }

  } else {
    searchData.value = {
      users: [],
      chats: [],
      messages: [],
    };
  }
};

const isSideBarScrolling = ref(false);
const sidebarScrollingHandler = e => {
  if (e.target.scrollTop !== 0) {
    isSideBarScrolling.value = true;
  } else {
    isSideBarScrolling.value = false;
  }
};

onMounted(async () => {
  await chatsStore.getChats();
  console.log(chatsStore.chats);
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
    height: 100vh;
    width: 100%;

    .v-sidebar-header {
      transition: box-shadow, border-bottom-color .3s ease;
    }

    .v-sidebar-header.scroll {
      box-shadow: 0 2px 2px var(--color-light-shadow);
    }

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
      max-width: 360px;
    }
  }
}
</style>
