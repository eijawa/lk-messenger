<template>
<!--  <a-popover-->
<!--    v-model:visible="isShow"-->
<!--    trigger="click"-->
<!--    placement="topRight"-->
<!--  >-->
<!--    <template #content>-->
<!--      <a-button-group>-->
<!--        <a-button type="text">-->
<!--          <template #icon>-->
<!--            <font-awesome-icon :icon="['fas', 'users']" />-->
<!--            Новая группа-->
<!--          </template>-->
<!--        </a-button>-->

<!--        <a-button type="text">-->
<!--          <template #icon>-->
<!--            <font-awesome-icon :icon="['fas', 'user']" />-->
<!--            Новое сообщение-->
<!--          </template>-->
<!--        </a-button>-->
<!--      </a-button-group>-->
<!--    </template>-->

<!--    <a-button-->
<!--      class="newchatbtn"-->
<!--      type="primary"-->
<!--      shape="circle"-->
<!--      size="lg"-->
<!--    >-->
<!--      <template #icon>-->
<!--        <font-awesome-icon :icon="['fas', 'pen']" size="lg" />-->
<!--      </template>-->
<!--    </a-button>-->
<!--  </a-popover>-->

  <n-popover
    trigger="click"
    placement="top-end"
    :show-arrow="false"
    to=".new-chat-popover"
  >
    <template #trigger>
      <div class="new-chat-button-trigger">
        <v-button>Клик</v-button>
      </div>
    </template>
    <div>
      Теекст
    </div>
  </n-popover>
</template>

<script setup>
import { ref } from 'vue';
import { NPopover } from 'naive-ui';

import VButton from '@/components/kit/VButton.vue';

const isShow = ref(false);
</script>

<style lang="scss" scoped>
.ant-btn-group {
  display: flex;
  flex-direction: column;

  .ant-btn {
    width: auto;

    padding: 0.25rem 0.5rem;

    gap: 0.5rem;

    display: grid;
    grid-template-columns: 32px auto;
    place-items: center;
    justify-content: flex-start;
  }
}

.newchatbtn {
  padding: 1.5rem;

  position: absolute;
  bottom: 1rem;
  right: 1rem;

  display: flex;
  place-items: center;
  place-content: center;
}

.new-chat-button-trigger {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}
</style>
