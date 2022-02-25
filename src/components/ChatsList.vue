<template>
  <ul class="chats-list">
    <a-empty v-if="chats.length === 0">
      <template #description>Нет начатых бесед...</template>
    </a-empty>

    <!-- <router-link v-for="(c, index) in chats" :key="index" :to="`/convs/${index}`">
      <chats-list-item :chat="c"></chats-list-item>
    </router-link> -->
    <chats-list-item v-for="(c, index) in chats" :key="index" :convid="index" :is-opened="openedConvId == index" :chat="c" @open="onOpenHandler"></chats-list-item>
  </ul>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useChatsStore } from "@/stores/chatsStore"

import ChatsListItem from '@/components/ChatsListItem.vue'

const chatsStore = useChatsStore();
const router = useRouter();



const chats = computed(() => chatsStore.chats);
var openedConvId = ref(-1);

const onOpenHandler = (convId) => {
  openedConvId.value = convId;
  router.push(`/convs/${convId}`);
};
</script>

<style lang="scss" scoped>
.chats-list {
  margin-bottom: 0;

  overflow-y: auto;
}

@media (min-width: 927px) {
  .chats-list {
    overflow-y: hidden;

    &:hover {
      overflow-y: auto;
    }
  }
}
</style>
