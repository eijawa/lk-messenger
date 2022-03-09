<template>
  <v-popover :is-show="isShow" @click-outside="onClickOutsideHandler">
    <template #trigger>
      <div class="new-chat-button-trigger">
        <v-button
          class="v-button-new-chat"
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
      Теееееееееееееекст
    </div>
    <div>
      Теееееееееееееекст
    </div>
    <div>
      Теееееееееееееекст
    </div>
    <div>
      Теееееееееееееекст
    </div>
    <div>
      Теееееееееееееекст
    </div>
    <div>
      Тееееееееееееееееееееееееееееееееееееекст
    </div>
    <div>
      Теееееееееееееекст
    </div>
  </v-popover>
</template>

<script setup>
import { ref } from 'vue';

import VPopover from '@/components/VPopover.vue';
import VButton from '@/components/kit/VButton.vue';
import VIcon from '@/components/kit/VIcon.vue';

import PenIcon from '@/assets/icons/pen.svg?url';

const isShow = ref(false);

const onClickHandler = () => {
  isShow.value = !isShow.value;
};

const onClickOutsideHandler = e => {
  if (!e.target.classList.contains('v-button-new-chat')) {
    isShow.value = false;
  }
};
</script>

<style lang="scss" scoped>

.new-chat-button-trigger {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}
</style>
