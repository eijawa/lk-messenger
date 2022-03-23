<script lang="ts" setup>
import {
  computed, shallowRef, onMounted, ref,
} from 'vue';

import { useMessengerSettingsStore } from '@/stores/messengerSettingsStore';
import { useChatsStore } from '@/stores/chatsStore';

import VButton from '@/components/kit/VButton.vue';
import VLayoutSwiping from '@/components/kit/VLayoutSwiping.vue';
import Sidebar from '@/components/Sidebar.vue';

const messengerSettingsStore = useMessengerSettingsStore();
const chatsStore = useChatsStore();

const leftColumnActiveComponent = shallowRef(Sidebar);

const isChatOpened = computed(() => messengerSettingsStore.isChatOpened);

const onCloseHandler = () => {
  messengerSettingsStore.$patch({
    isChatOpened: false,
  });
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

onMounted(async () => {
  await chatsStore.getChats();
  console.log(chatsStore.chats);
});
</script>

<template>
  <div class="messenger">
    <div class="left-column">
      <component :is="leftColumnActiveComponent" />
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
      class="modal right-column"
      @close="onCloseMoreInfoHandler"
    >
      <div class="right-column-content">
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

    .middle-column-content {
      display: flex;
      flex-direction: column;
      width: 100%;
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
