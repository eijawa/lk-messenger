<template>
  <header class="chat-header">
    <router-link to="/" class="back-btn">
      <a-button type="text">
        <template #icon>
          <font-awesome-icon :icon="['fas', 'arrow-left']" size="lg" />
        </template>
      </a-button>
    </router-link>

    <div class="chat-info" @click="onChatInfoClick">
      <a-avatar
        :src="chat.avatarSrc"
        shape="circle"
        :size="42"
        style="background-color:var(--volsu-yellow); font-size: 1.15rem; font-weight: bold;"
      >{{ titleFirstLetters }}</a-avatar>

      <div class="chat-content">
        <span class="chat__title typo" :title="chat.title">{{ chat.title }}</span>
        <span class="chat__text typo">Тут будет либо количество участников, либо последний статус человека</span>
      </div>
    </div>

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

import getFirstLetters from '@/helpers/firstLettersHelper';

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

// Avatar functions
const titleFirstLetters = computed(() => getFirstLetters(props.chat.title));
</script>

<style lang="scss" scoped>
.chat-header {
  width: 100%;

  padding: 10px 1rem;

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
