<template>
  <n-popover
    class="v-popover"
    trigger="click"
    :show="props.isShow"
    placement="top-end"
    :show-arrow="false"
    to=".new-chat-popover"
    :on-clickoutside="onClickOutsideHandler"
  >
    <template #trigger>
      <slot name="trigger" />
    </template>
    <slot name="default" />
  </n-popover>
</template>

<script setup>
import { NPopover } from 'naive-ui';

const props = defineProps({
  isShow: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['clickOutside']);

const onClickOutsideHandler = e => {
  emit('clickOutside', e);
};
</script>

<style lang="scss" scoped>

:global(.v-popover) {
  :deep(.n-popover) {
    background: rgba(255,255,255,0.733333) !important;
    backdrop-filter: blur(10px);
  }
}

</style>
