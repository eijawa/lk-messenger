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

    <div
      class="messenger-main"
      :class="{ 'messenger-main-opened': isChatOpened, 'messenger-touch-start': touchStart }"
      :style="{ transform: viewTransform }"
      @touchstart="touchStartHandler"
      @touchmove="touchMoveHandler"
      @touchend="touchEndHandler"
      @touchcancel="touchEndHandler"
    >
      <div class="layout-touch-test">
        <v-button type="primary" @click="onClickButtonBackHandler">Назад</v-button>
        <div style="margin-top: 5rem">
          <h3>Transform start: {{ transformStartRef }}</h3>
          <h3>Touch distance: {{ touchDistanceRef }}</h3>
          <h3>Touch seconds: {{ touchSecondsRef }}</h3>
          <h3>Touch distanceX: {{ touchDistanceXRef }}</h3>
          <h3>Touch speed: {{ touchSpeedRef }}</h3>
        </div>
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
        </div>
      </div>
      <!--      <router-view />-->
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
import VButton from '@/components/kit/VButton.vue';
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

const onClickButtonBackHandler = () => {
  messengerSettingsStore.$patch({
    isChatOpened: false,
  });
};

const isSideBarScrolling = ref(false);
const sidebarScrollingHandler = e => {
  isSideBarScrolling.value = e.target.scrollTop !== 0;
};

let touchStartValue = {
  x: 0,
  y: 0,
};

let touchStartX = 0;
let touchDistanceX = 0;
let touchYdifference = 0;
const touchStart = ref(false);
let transformStart = false;
let dateStart = null;
let touchStartPoint = null;
const viewTransform = ref('translateX(0)');

const transformStartRef = ref(null);

let isSecondTouch = false;
let isXTouch = false;
const touchStartHandler = e => {
  // console.log(e);

  // touchStart.x
  touchStartX = e.changedTouches[0].clientX;

  dateStart = Date.now();

  touchStartPoint = e.changedTouches[0];
  transformStart = false;
  transformStartRef.value = false;
};

const touchMoveHandler = e => {
  const touchDistanceTmp = touchDistanceX;
  touchDistanceX = Math.round(e.touches[0].clientX - touchStartX);
  //
  // console.log(`%c${touchDistanceTmp}`, 'color: red');
  // console.log(touchDistance);

  // console.log(touchStartPoint);
  // console.log(e);

  if (!isSecondTouch) {
    isSecondTouch = true;
    if (touchDistanceX > 1 && Math.abs(e.touches[0].clientY - touchStartPoint.clientY) < 6) {
      isXTouch = true;
    }
  }

  if (touchDistanceX > 0 && isXTouch) {
    transformStart = true;
    transformStartRef.value = true;
    touchStart.value = true;
  }



  if (transformStart && isXTouch) {
    if (touchDistanceX > touchDistanceTmp && touchDistanceX > 0) {
      for (let i = touchDistanceTmp; i < touchDistanceX; i += 1) {
        // console.log(i);
        viewTransform.value = `translateX(${i}px)`;
      }
    } else if (touchDistanceX > 0) {
      for (let j = touchDistanceTmp; j > touchDistanceX; j -= 1) {
        viewTransform.value = `translateX(${j}px)`;
      }
    } else {
      viewTransform.value = 'translateX(0)';
    }
  }
};



const touchDistanceRef = ref(null);
const touchSecondsRef = ref(null);
const touchDistanceXRef = ref(null);
const touchSpeedRef = ref(null);
const touchEndHandler = e => {
  touchStart.value = false;
  transformStart = false;
  const dateEnd = Date.now();
  const touchDistance = Math.sqrt((e.changedTouches[0].clientX - touchStartPoint.clientX) ** 2 + (e.changedTouches[0].clientY - touchStartPoint.clientY) ** 2);
  // console.log(distance);

  // const dateDifference = dateEnd.getTime() - dateStart.getTime();

  const touchSeconds = (dateEnd - dateStart) / 1000;
  const touchSpeed = touchDistance / touchSeconds;

  // console.log(`%c${touchDistanceX}`, 'color: red');
  // console.log(touchSpeed);

  touchDistanceRef.value = touchDistance;
  touchSecondsRef.value = touchSeconds;
  touchDistanceXRef.value = touchDistanceX;
  touchSpeedRef.value = touchSpeed;
  transformStartRef.value = false;


  if (isXTouch && (touchDistanceX > 140 || (touchDistanceX > 30 && touchSpeed > 999))) {
    messengerSettingsStore.$patch({
      isChatOpened: false,
    });
  }

  isSecondTouch = false;
  isXTouch = false;
  viewTransform.value = 'translateX(0)';
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
    position: relative;

    @media (min-width: 927px) {
      min-width: 360px;
      max-width: 360px;
    }

    @media (max-width: 926px) {
      position: fixed;
      left: 0;
      top: 0;
      height: calc(var(--vh, 1vh) * 100);
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

    .layout-touch-test {
      display: flex;
      flex-direction: column;
      width: 100%;
      overflow-y: scroll;
    }

    &:not(.messenger-main-opened) {
      transform: unset;
    }

    @media (max-width: 926px) {
      position: fixed;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      animation-timing-function: linear;
      //transition: transform 150ms linear;


      &:not(.messenger-touch-start) {
        //transition: transform .2s cubic-bezier(0.8, 1, 0.68, 1);
        transition: transform .12s linear;
      }

      &.messenger-touch-start {
        .layout-touch-test {
          touch-action: none;
          overflow: hidden;
        }
      }

      &:not(.messenger-main-opened) {
        transform: translateX(100vw) !important;
      }
    }
  }
}
</style>
