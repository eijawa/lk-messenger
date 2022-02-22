<template>
  <a-layout>
    <a-layout-sider
      v-model:collapsed="isSiderCollapsed"
      :style="siderStyle"
      :width="siderWidth"
      theme="light"
    >
      <a-layout-header :style="siderHeaderStyle">
        <conversations-list-header></conversations-list-header>
      </a-layout-header>

      <a-layout-content>
        <conversations-list></conversations-list>
      </a-layout-content>
    </a-layout-sider>

    <router-view></router-view>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue'
import { mediaQueryMaxWidth926, mediaQueryMinWidth927 } from "../use/useLayout";

import ConversationsListHeader from '../components/ConversationsListHeader.vue'
import ConversationsList from '../components/ConversationsList.vue'

const mediaQueryScreenMaxWidthHandler = (e) => {
  if (e.matches) {
    console.log(e);
  }
}

mediaQueryMaxWidth926.addEventListener('change', (e) => {
  mediaQueryScreenMaxWidthHandler(e);
});

mediaQueryMinWidth927.addEventListener('change', (e) => {
  mediaQueryScreenMaxWidthHandler(e);
});

mediaQueryScreenMaxWidthHandler(mediaQueryMaxWidth926);
mediaQueryScreenMaxWidthHandler(mediaQueryMinWidth927);

const isSiderCollapsed = ref(false);

const siderWidth = 300;

const siderStyle = {
  'position': 'fixed',
  'height': 'inherit'
};

const siderHeaderStyle = {
  'width': '100%',
  'padding': '1rem',
  'display': 'inline-flex',
  'place-items': 'center',
  'place-content': 'space-between'
};
</script>

<style lang="scss" scoped>
.ant-layout {
  height: inherit;
}
</style>
