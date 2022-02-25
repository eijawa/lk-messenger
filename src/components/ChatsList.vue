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
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

import ChatsListItem from './ChatsListItem.vue'

const store = useStore();
const router = useRouter();

const chats = computed(() => store.state.chatsModule.state.chats);
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