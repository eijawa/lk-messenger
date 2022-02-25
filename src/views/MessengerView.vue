<template>
  <div class="messenger">
    <div class="messenger-sidebar">
      <sidebar-header />
      <chats-list />
    </div>
    <div class="messenger-main" :class="{'messenger-main-opened': isChatOpened}">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMessengerSettingsStore } from "../stores/messengerSettingsStore";

import SidebarHeader from '../components/SidebarHeader.vue';
import ChatsList from '../components/ChatsList.vue';

const store = useMessengerSettingsStore();

const isChatOpened = computed(() => store.isChatOpened);
</script>

<style lang="scss" scoped>

.messenger {
  display: flex;

  .messenger-sidebar {
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
