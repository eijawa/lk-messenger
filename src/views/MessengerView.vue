<script lang="ts" setup>
import {
  computed, onMounted, provide, ref,
} from 'vue';

import { useMessengerSettingsStore } from '@/stores/messengerSettingsStore';
import { useChatsStore } from '@/stores/chatsStore';

import VViewSwitchController from '@/components/kit/VViewsSwitchController.vue';
import VLayoutSwiping from '@/components/kit/VLayoutSwiping.vue';
import ChatView from '@/views/middleColumn/ChatView.vue';
import MoreInfoView from '@/views/rightColumn/MoreInfoView.vue';

const messengerSettingsStore = useMessengerSettingsStore();

const chatsStore = useChatsStore();

const isMobileVersion = ref<boolean>(window.innerWidth < 927);
window.addEventListener('resize', (e: Event) => {
  isMobileVersion.value = (e.target as Window).innerWidth < 927;
});

const isChatOpened = ref(false);
const isChatOpenedChangeState = (state: boolean) => {
  isChatOpened.value = state;
};

provide('isChatOpened', {
  isChatOpened,
  isChatOpenedChangeState,
});

const isMoreInfoOpened = ref(false);
const isMoreInfoOpenedChangeState = (state: boolean) => {
  isMoreInfoOpened.value = state;
};

provide('isMoreInfoOpened', {
  isMoreInfoOpened,
  isMoreInfoOpenedChangeState,
});

const middleColumnCollapse = computed(() => (isMoreInfoOpened.value ? 'collapse' : ''));

onMounted(async () => {
  await chatsStore.getChats();
  console.log(chatsStore.chats);
});
</script>

<template>
  <div class="messenger">
    <template v-if="isMobileVersion">
      <v-view-switch-controller />
    </template>

    <template v-else>
      <div class="left-column">
        <router-view />
<!--        <component :is="messengerSettingsStore.leftColumnActiveComponentGetter" />-->
      </div>

      <v-layout-swiping
        :is-opened="isChatOpened"
        class="middle-column"
        :class="[middleColumnCollapse]"
        @close="isChatOpenedChangeState(false)"
      >
        <router-view name="ChatView" />
      </v-layout-swiping>

      <v-layout-swiping
        :is-opened="isMoreInfoOpened"
        standing-style="modal"
        class="modal right-column"
        @close="isMoreInfoOpenedChangeState(false)"
      >
        <router-view name="MoreInfoView" />
      </v-layout-swiping>
    </template>
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

  .left-column {
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
  }

  .right-column {
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

    .right-column-content {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
}
</style>
