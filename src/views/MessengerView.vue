<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { NScrollbar } from 'naive-ui';

import { useMessengerSettingsStore } from '@/stores/messengerSettingsStore';
import { useChatsStore } from '@/stores/chatsStore';
import SidebarHeader from '@/components/SidebarHeader.vue';
import MessengerSearch from '@/components/MessengerSearch.vue';
import ChatsList from '@/components/chat/ChatsList.vue';
import NewChatButton from '@/components/NewChatButton.vue';
import VButton from '@/components/kit/VButton.vue';
import VLayoutSwiping from '@/components/kit/VLayoutSwiping.vue';
import { SearchService } from '@/services/SearchService';

const messengerSettingsStore = useMessengerSettingsStore();
const chatsStore = useChatsStore();
const searchService = new SearchService();

const isChatOpened = computed(() => messengerSettingsStore.isChatOpened);

const onCloseHandler = () => {
  messengerSettingsStore.$patch({
    isChatOpened: false,
  });
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

const onClickButtonBackHandler = () => {
  messengerSettingsStore.$patch({
    isChatOpened: false,
  });
};

const isMoreInfoOpened = ref(false);
const middleColumnCollapse = computed(() => (isMoreInfoOpened.value ? 'collapse' : ''));
const onClickButtonMoreInfo = () => {
  isMoreInfoOpened.value = true;
};

const onCloseMoreInfoHandler = () => {
  isMoreInfoOpened.value = false;
};

const isSideBarScrolling = ref(false);
const sidebarScrollingHandler = (e: Event) => {
  isSideBarScrolling.value = (e.target as HTMLElement).scrollTop !== 0;
};

onMounted(async () => {
  await chatsStore.getChats();
  console.log(chatsStore.chats);
});
</script>

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

    <v-layout-swiping
      :is-opened="isChatOpened"
      class="middle-column"
      :class="[middleColumnCollapse]"
      @close="onCloseHandler"
    >
      <div class="middle-column-content">
        <v-button type="primary" @click="onClickButtonBackHandler">
          Назад
        </v-button>
        <v-button type="primary" @click="onClickButtonMoreInfo">
          Информация
        </v-button>
        <div>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
        </div>
      </div>
    </v-layout-swiping>

    <v-layout-swiping
      :is-opened="isMoreInfoOpened"
      standing-style="modal"
      class="left-column modal"
      @close="onCloseMoreInfoHandler"
    >
      <div class="left-column-content">
        <v-button type="primary" @click="onCloseMoreInfoHandler">
          Назад
        </v-button>
        <div>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
          <h4>Lorem</h4>
        </div>
      </div>
    </v-layout-swiping>
  </div>
</template>

<style lang="scss" scoped>
.messenger {
  --left-column-width: 360px;
  --right-column-width: 25vw;

  height: calc(var(--vh, 1vh) * 100);
  overflow: hidden;

  @media (min-width: 927px) {
    height: 100%;
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: 100%;
  }

  .messenger-sidebar {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;

    @media (min-width: 927px) {
      min-width: var(--left-column-width);
      max-width: var(--left-column-width);
    }

    @media (max-width: 926px) {
      position: fixed;
      left: 0;
      top: 0;
      height: calc(var(--vh, 1vh) * 100);
    }

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

  .middle-column {
    background-color: #ffffff;
    width: 100%;
    z-index: 1;

    @media (min-width: 1300px) {
      transition: width .2s ease-out;

      &.collapse {
        width: calc(100% - var(--right-column-width));
      }
    }

    .middle-column-content {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }

  .left-column {
    background-color: #fb8c00;
    width: 100%;
    z-index: 2;

    @media (min-width: 927px) {
      &.modal {
        position: fixed;
        right: 0;
        top: 0;
        height: calc(var(--vh, 1vh) * 100);
        overflow: hidden;

        &:not(.layout-swiping-opened) {
          width: 0;
        }
      }

      width: calc(100% - var(--left-column-width));
      transition: width .2s ease-out;
    }

    @media (min-width: 1300px) {
      width: var(--right-column-width);
    }

    .left-column-content {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
}
</style>
