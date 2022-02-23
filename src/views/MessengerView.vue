<template>
  <div class="messenger-main">
    <div class="messenger-conversations-list">
      <conversations-list-header class="messenger-conversations-list-header" />
      <conversations-list />
    </div>
    <div class="messenger-conversations-main" :class="{'messenger-conversations-main-opened': isChatOpened}">
      <router-view></router-view>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

import ConversationsListHeader from '../components/ConversationsListHeader.vue';
import ConversationsList from '../components/ConversationsList.vue';

const store = useStore();

const isChatOpened = computed(() => store.state.messengerLayoutModule.isChatOpened);
</script>

<style lang="scss" scoped>

.messenger-main {
  display: flex;

  @media (min-width: 927px) {
    .messenger-conversations-main {
      position: relative;
    }
  }
  .messenger-conversations-list {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-height: 100vh;
    width: 100%;

    .messenger-conversations-list-header {
      background-color: #2b3048;
      padding: 10px 1rem;
    }
  }

  .messenger-conversations-main {
    display: flex;
    height: 100%;
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

  .messenger-conversations-main:not(.messenger-conversations-main-opened) {
    transform: translate3d(100vh, 0, 0);
  }

  @media (min-width: 927px) {
    .messenger-conversations-main {
      position: relative;
      left: unset;
      top: unset;
      bottom: unset;
      right: unset;
      transform: unset;
    }

    .messenger-conversations-main:not(.messenger-conversations-main-opened) {
      transform: unset;
    }
  }
}


</style>
