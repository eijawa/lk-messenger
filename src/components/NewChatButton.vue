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
            <Transition name="pen-icon">
              <v-icon
                v-if="!isShow"
                class="new-chat-button-icon"
                name="clear"
                :src="PenIcon"
                fill="white"
              />
            </Transition>
            <Transition name="close-icon">
              <v-icon
                v-if="isShow"
                name="close"
                :src="CloseIcon"
                :size="32"
                fill="white"
              />
            </Transition>
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
import CloseIcon from '@/assets/icons/x.svg?url';

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

.new-chat-button-icon {
  position: absolute;
}

.pen-icon-enter-active {
  animation: pen-icon-in .3s;
}

.pen-icon-leave-active {
  animation: pen-icon-in .2s reverse;
}

@keyframes pen-icon-in {
  0% {
    opacity: 0;
    transform: scale(0%);
  }
  100% {
    opacity: 1;
    transform: scale(100%);
  }
}

.close-icon-enter-active {
  animation: close-icon-in .3s;
}

.close-icon-leave-active {
  animation: close-icon-in .2s reverse;
}

@keyframes close-icon-in {
  0% {
    opacity: 0;
    transform: scale(0%);
  }
  100% {
    opacity: 1;
    transform: scale(100%);
  }
}
</style>
