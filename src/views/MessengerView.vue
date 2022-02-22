<script setup>
import { ref } from 'vue'

import ConversationsListHeader from '../components/ConversationsListHeader.vue'
import ConversationsList from '../components/ConversationsList.vue'

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

<template>
  <a-layout>
    <!-- Left Side -->
    <!-- SideBar -->
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

    <!-- Right Side -->
    <!-- Conversation Content -->
    <router-view></router-view>
  </a-layout>
</template>

<style lang="scss" scoped>
.ant-layout {
  height: inherit;
}
</style>
