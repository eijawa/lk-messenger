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

      <div class="sidebar-list">
        <n-scrollbar class="sidebar-scrollbar" @scroll="sidebarScrollingHandler">
          <chats-list v-if="!isSearchActive" />
          <messenger-search v-else :date="searchData" />
        </n-scrollbar>
      </div>

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
  isSideBarScrolling.value = e.target.scrollTop !== 0;
};

onMounted(async () => {
  await chatsStore.getChats();
  console.log(chatsStore.chats);
});
</script>

<style lang="scss" scoped>
.messenger {
  height: 100%;
  overflow: hidden;

  @media (min-width: 927px) {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 100%;
  }

  @media (max-width: 926px) {
    height: calc(var(--vh, 1vh) * 100);
  }

  .messenger-sidebar {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    //background-color: #2e3939;

    @media (min-width: 927px) {
      min-width: 360px;
      max-width: 360px;
    }

    .v-sidebar-header {
      transition: box-shadow, border-bottom-color .3s ease;
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

  .messenger-main {
    display: flex;
    position: relative;
    min-width: 0;
    height: 100%;
    z-index: 1;

    background-color: #f0f2f5;
    //background-color: #49d3d3;

    &:not(.messenger-main-opened) {
      transform: unset;
    }

    @media (max-width: 926px) {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      transform: translate3d(0, 0, 0);
      transition: 300ms cubic-bezier(0.8, 1, 0.68, 1);

      &:not(.messenger-main-opened) {
        transform: translate3d(100vw, 0, 0);
      }
    }
  }
}
</style>
