<script lang="ts" setup>
import {
  computed, onMounted, ref, watch,
} from 'vue';
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router';

import { useChatsStore } from '@/stores/chatsStore';
import VLayoutSwiping from '@/components/kit/VLayoutSwiping.vue';
import SideBar from '@/views/messenger/SidebarView.vue';
import ChatView from '@/views/messenger/chat/ChatView.vue';
import MoreInfoView from '@/views/messenger/chat/MoreInfoView.vue';

const router = useRouter();
const route = useRoute();

const isMobileVersion = ref<boolean>(window.innerWidth < 927);
window.addEventListener('resize', (e: Event) => {
  isMobileVersion.value = (e.target as Window).innerWidth < 927;
});

const isSidebarOpened = computed(() => route.name === 'messenger');
const isChatOpened = computed(() => route.name === 'chat');
const isMoreInfoOpened = computed(() => route.name === 'chatInfo');

const middleColumnCollapse = computed(() => (isMoreInfoOpened.value ? 'collapse' : ''));

const transitionDurationMs = ref(90);

const backViewRoute = computed(() => (route.matched.length > 2 ? route.matched[
  route.matched.length - 2
] : null));

const frontViewRoute = computed(() => route.matched[
  route.matched.length - 1
]);

const sidebarView = computed(() => route.matched.find(routeItem => routeItem.name === 'messenger'));
const chatView = computed(() => route.matched.find(routeItem => routeItem.name === 'chat'));

const isViewOpened = ref(true);
const isInstantsRender = ref(false);
const isViewAnimated = ref(true);
const isGoBackEvent = ref(false);

const isViewOpenedChangeState = () => {
  if (backViewRoute.value !== null) {
    isViewOpened.value = false;
  }
};

const isViewChangeComponent = async () => {
  if (backViewRoute.value !== null) {
    isInstantsRender.value = true;
    await router.push({ name: backViewRoute.value?.name });
    isViewOpened.value = true;
    isInstantsRender.value = false;
    isGoBackEvent.value = false;
  }
};

// onBeforeRouteUpdate(() => {
//   if (!isGoBackEvent.value) {
//     isViewAnimated.value = false;
//     isViewOpened.value = false;
//   }
// });
//
// watch((route), () => {
//   if (!isGoBackEvent.value) {
//     isViewAnimated.value = true;
//     isViewOpened.value = true;
//   }
// });

const chatStore = useChatsStore();

onMounted(async () => {
  await chatStore.getChats();
});
</script>

<template>
  <div class="messenger">
    <div class="left-column">
      <div class="back-view">
        <component :is="backViewRoute.components.default" v-if="backViewRoute !== null" />
      </div>
      <v-layout-swiping
        :is-opened="isViewOpened"
        :is-active="backViewRoute !== null"
        :is-view-animated="isViewAnimated"
        :is-instants-render="isInstantsRender"
        :transition-duration-ms="transitionDurationMs"
        standing-style="modal"
        class="front-view"
        @close="isGoBackEvent = true; isViewOpenedChangeState(false)"
        @transition-close-end="isViewChangeComponent"
      >
        <SideBar
          v-if="(isSidebarOpened || isChatOpened || isMoreInfoOpened) && !isMobileVersion
            && typeof sidebarView !== 'undefined'"
        />
        <component
          :is="frontViewRoute.components.default"
          v-else
        />
      </v-layout-swiping>
    </div>

    <template v-if="!isMobileVersion">
      <div class="middle-column" :class="[middleColumnCollapse]">
        <ChatView
          v-if="(isChatOpened || isMoreInfoOpened)
            && typeof chatView !== 'undefined'"
        />
      </div>

      <div class="modal right-column" :class="{ opened: isMoreInfoOpened }">
        <MoreInfoView v-if="isMoreInfoOpened" />
      </div>
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

    .back-view {
      position: relative;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      overflow: hidden;

      @media (max-width: 926px) {
        height: calc(var(--vh, 1vh) * 100);
      }
    }

    .front-view {
      z-index: 1;
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      background-color: #ffffff;

      @media (min-width: 927px) {
        min-width: var(--left-column-width);
        max-width: var(--left-column-width);
      }

      @media (max-width: 926px) {
        height: calc(var(--vh, 1vh) * 100);
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

        &:not(.opened) {
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
