<script lang="ts" setup>
import ChatHeader from '@/components/chat/ChatHeader.vue';
import ChatMessageCreate from '@/components/chat/ChatMessageCreate.vue';
import { NScrollbar } from 'naive-ui';
</script>

<template>
  <div class="chat-view">
    <chat-header />
    <div class="chat-messages">
      <n-scrollbar>
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
      </n-scrollbar>
    </div>
    <chat-message-create />
  </div>
</template>

<style lang="scss" scoped>
.chat-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: var(--color-background-secondary);

  .chat-messages {
    height: 100%;
    width: 100%;
    flex: 1;
    overflow: hidden;
  }
}
</style>
