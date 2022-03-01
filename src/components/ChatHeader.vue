<template>
  <header class="chat-header">
    <router-link to="/" class="back-btn">
      <a-button type="text">
        <template #icon>
          <font-awesome-icon :icon="['fas', 'arrow-left']" size="lg" />
        </template>
      </a-button>
    </router-link>

    <base-list-item
      :avatar-src="chat?.avatarSrc"
      :avatar-size="42"
      :title="chat.title"
      :university-pallete="chat.type === 'tat' ? chat.members[0].university : ''"
      @click="onChatInfoClick"
    >
      <template #text>
        <span v-if="chat.type === 'tat'">Тут будет либо количество участников, либо последний статус человека</span>
        <span v-else>{{ chat.members.length }}</span>
      </template>
    </base-list-item>

    <div class="chat-utils">
      <a-space>
        <a-button type="text">
          <template #icon>
            <font-awesome-icon :icon="['fas', 'magnifying-glass']" size="lg" />
          </template>
        </a-button>

        <a-button type="text">
          <template #icon>
            <font-awesome-icon :icon="['fas', 'ellipsis-vertical']" size="lg" />
          </template>
        </a-button>
      </a-space>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue';

import BaseListItem from '@/components/base/BaseListItem.vue';

const props = defineProps({
  chat: {
    type: Object,
    required: true,
    default: () => { },
  },
});

const emits = defineEmits(['open-info']);

const onChatInfoClick = () => {
  emits('open-info');
};
</script>

<style lang="scss" scoped>
.chat-header {
  width: 100%;

  padding: 0 1rem;

  display: flex;
  place-items: center;

  background-color: #fff;
}

.back-btn {
  margin-right: 0.5rem;
}

.chat-info {
  display: flex;
  flex-grow: 1;
  place-items: center;

  cursor: pointer;
}

.chat-content {
  margin-left: 0.5rem;

  display: flex;
  flex-direction: column;
  place-content: center;
}

.chat {
  &__title {
    font-weight: bold;
    color: var(--volsu-black);
  }

  &__msg {
    color: var(--volsu-dark-gray);
  }
}
</style>
