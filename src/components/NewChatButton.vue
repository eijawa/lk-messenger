<script lang="ts" setup>
import { ref } from 'vue';

import { useGetCSSVariable } from '@/hooks/useCssVariables';
import VPopover from '@/components/kit/VPopover.vue';
import VButton from '@/components/kit/VButton.vue';
import VMenuButton from '@/components/kit/VMenuButton.vue';
import VIcon from '@/components/kit/VIcon.vue';

import PenIcon from '@/assets/icons/pen.svg?url';
import CloseIcon from '@/assets/icons/x.svg?url';
import UserIcon from '@/assets/icons/user.svg?url';
import GroupIcon from '@/assets/icons/group.svg?url';

const isShow = ref(false);

const iconColor = useGetCSSVariable('--color-icon-secondary');

const onClickHandler = () => {
  isShow.value = !isShow.value;
};

const onClickOutsideHandler = () => {
  isShow.value = false;
};
</script>

<template>
  <v-popover
    :is-show="isShow"
    placement="top-end"
    to=".new-chat-popover"
    @click-outside="onClickOutsideHandler"
  >
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
                v-show="!isShow"
                class="new-chat-button-icon"
                name="clear"
                :src="PenIcon"
                fill="white"
              />
            </Transition>
            <Transition name="close-icon">
              <v-icon
                v-show="isShow"
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
    <div class="new-chat-button-menu">
      <v-menu-button size="small" :font-size="0.875">
        <template #icon>
          <v-icon
            :src="GroupIcon"
            name="group"
            :size="20"
            :fill="iconColor"
          />
        </template>
        Создать группу
      </v-menu-button>
      <v-menu-button size="small" :font-size="0.875">
        <template #icon>
          <v-icon
            :src="UserIcon"
            name="user"
            :size="20"
            :fill="iconColor"
          />
        </template>
        Создать чат
      </v-menu-button>
    </div>
  </v-popover>
</template>

<style lang="scss" scoped>
.new-chat-button-trigger {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
}

.new-chat-button-menu {
  width: 200px;
  padding: 0.25rem 0;
  display: flex;
  flex-direction: column;
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
