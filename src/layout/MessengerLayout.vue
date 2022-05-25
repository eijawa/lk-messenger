<script lang="ts" setup>
import {
  computed, onMounted, ref, shallowRef, triggerRef,
} from 'vue';
import {
  useRoute, useRouter, onBeforeRouteUpdate, RouteLocationMatched,
} from 'vue-router';

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

const isViewOpened = ref(true);
const transitionDurationMs = ref(90);
const layoutTransitionName = computed(() => `layout${!isViewOpened.value ? 'active' : ''}`);

const isLayoutCloseHandler = () => {
  isViewOpened.value = false;
};

const viewsList = shallowRef<Array<RouteLocationMatched>>([]);
const routeState = ref<null | 'next' | 'back' | 'new'>(null);

const isViewChangeComponent = async () => {
  const startDate = Date.now();
  if (route.matched.length > 2) {
    await router.push({ name: route.matched[route.matched.length - 2].name, params: route.params });
  }
  console.log(Date.now() - startDate);
};

if (route.matched.length > 2) {
  viewsList.value.push(route.matched[route.matched.length - 2]);
}
viewsList.value.push(route.matched[route.matched.length - 1]);

onBeforeRouteUpdate((nextRoute, prevRoute) => {
  isViewOpened.value = true;
  if (nextRoute.name !== prevRoute.name) {
    if (typeof nextRoute.matched[nextRoute.matched.length - 1]?.children.find(routeChildren => routeChildren?.name === prevRoute?.name) !== 'undefined') { // back
      if (viewsList.value.length > 1) {
        viewsList.value.pop();
      }

      if (route.matched.length > 2) {
        viewsList.value.unshift(route.matched[route.matched.length - 3]);
      }

      routeState.value = 'back';
    } else if (typeof prevRoute.matched[prevRoute.matched.length - 1]?.children.find(routeChildren => routeChildren?.name === nextRoute?.name) !== 'undefined') { // next
      viewsList.value.push(nextRoute.matched[nextRoute.matched.length - 1]);

      if (viewsList.value.length > 2) {
        viewsList.value.shift();
      }

      routeState.value = 'next';
    } else { // new
      viewsList.value = [];
      viewsList.value.push(nextRoute.matched[nextRoute.matched.length - 1]);

      if (route.matched.length > 2) {
        viewsList.value.unshift(route.matched[route.matched.length - 2]);
      }

      routeState.value = 'new';
    }

    triggerRef(viewsList);
  }
});

router.beforeEach(() => {
  triggerRef(viewsList);
});

const chatStore = useChatsStore();

onMounted(async () => {
  await chatStore.getChats();
});
</script>

<template>
  <div class="messenger">
    <div class="left-column">
      <div
        v-if="!isMobileVersion
          && (isSidebarOpened || isChatOpened || isMoreInfoOpened)"
        class="view"
      >
        <SideBar />
      </div>
      <transition-group v-else :name="layoutTransitionName">
        <div
          v-for="(view, index) in viewsList"
          :key="view.path"
          class="view"
        >
          <Component
            :is="view.components.default"
            v-if="index !== viewsList.length - 1 || viewsList.length === 1"
          />
          <v-layout-swiping
            v-else
            :is-opened="isViewOpened"
            :is-active="viewsList.length > 1"
            :transition-duration-ms="transitionDurationMs"
            standing-style="modal"
            @close="isLayoutCloseHandler"
            @transition-close-end="isViewChangeComponent"
          >
            <component :is="view.components.default" />
          </v-layout-swiping>
        </div>
      </transition-group>
    </div>

    <template v-if="!isMobileVersion">
      <div class="middle-column" :class="[middleColumnCollapse]">
        <ChatView v-if="isChatOpened || isMoreInfoOpened" />
      </div>

      <div class="right-column" :class="{ opened: isMoreInfoOpened }">
        <MoreInfoView v-if="isChatOpened || isMoreInfoOpened" />
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

    .view {
      position: fixed;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;

      @media (min-width: 927px) {
        min-width: var(--left-column-width);
        max-width: var(--left-column-width);
      }
    }

    .layout-enter-active,
    .layout-leave-active {
      transition: transform .09s linear;
    }
    .layout-enter-from,
    .layout-leave-to {
      transform: translateX(100vw);
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
    width: 100%;
    z-index: 2;
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    overflow: hidden;
    transition: width .2s ease-out;

    @media (min-width: 927px) {
      width: calc(100% - var(--left-column-width));
    }

    @media (min-width: 1300px) {
      width: var(--right-column-width);
    }

    &:not(.opened) {
      width: 0;
    }

    .right-column-content {
      display: flex;
      flex-direction: column;
      width: 100%;
    }
  }
}
</style>
