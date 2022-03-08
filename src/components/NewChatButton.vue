<template>
  <n-popover
    trigger="click"
    :show="isShow"
    placement="top-end"
    :show-arrow="false"
    to=".new-chat-popover"
  >
    <template #trigger>
      <div class="new-chat-button-trigger">
        <v-button
          type="primary"
          circle
          size="large"
          @click="onClickHandler"
        >
          <template #icon>
            <v-icon
              name="clear"
              :src="PenIcon"
              fill="white"
            />
          </template>
        </v-button>
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
import VIcon from '@/components/kit/VIcon.vue';

import PenIcon from '@/assets/icons/pen.svg?url';

const isShow = ref(false);

const onClickHandler = () => {
  isShow.value = !isShow.value;
};
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
