<script lang="ts" setup>
import ChatHeader from '@/components/chat/ChatHeader.vue';
</script>

<template>
<!--  <div class="middle-column-content">-->
<!--    <v-button type="primary" @click="router.push({ name: 'messenger' })">-->
<!--      Назад-->
<!--    </v-button>-->
<!--    <v-button type="primary" @click="router.push({ name: 'chatInfo' })">-->
<!--      Информация-->
<!--    </v-button>-->
<!--    <div>-->
<!--      <h4>Lorem</h4>-->
<!--    </div>-->
<!--  </div>-->
  <div class="chat-view">
    <chat-header />
    <div class="chat-messages">
    </div>
    <div class="chat-message-create">
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #ffffff;

  .chat-messages {
    height: 100%;
    flex-grow: 1;
    background-color: #4a729a;
  }

  .chat-message-create {
    min-height: 100px;
    background-color: #8c8c91;
  }
}
</style>
