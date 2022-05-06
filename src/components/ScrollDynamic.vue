<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps({
  isLoadingTopDate: {
    type: Boolean,
    required: true,
  },
  isLoadingBottomDate: {
    type: Boolean,
    required: true,
  },
  isLoadingCondition: {
    type: Boolean,
    required: true,
  },
  offsetBeforeLoading: {
    type: Number,
    default: 200,
  },
});

const isLoadingTopDateValue = computed(() => props.isLoadingTopDate);
const isLoadingBottomDateValue = computed(() => props.isLoadingBottomDate);
const isLoadingConditionValue = computed(() => props.isLoadingCondition);

const emit = defineEmits(['endAddTrigger', 'startDeleteTrigger', 'startAddTrigger', 'endDeleteTrigger']);

const onScroll = (e: Event) => {
  const { target } = e;
  if (target) {
    if (Math.ceil(target.scrollTop) + props.offsetBeforeLoading
      >= target.scrollHeight - target.offsetHeight
      && isLoadingBottomDateValue.value) {
      if (isLoadingConditionValue.value) {
        emit('endAddTrigger');
      } else {
        emit('endAddTrigger');
        const scrollOffset = target.scrollHeight - (target.scrollTop + target.offsetHeight);
        emit('startDeleteTrigger');
        target.scrollTop = target.scrollHeight - scrollOffset - target.offsetHeight;
      }
    }

    if (Math.ceil(target.scrollTop) <= props.offsetBeforeLoading && isLoadingTopDateValue.value) {
      if (isLoadingConditionValue.value) {
        emit('startAddTrigger');
      } else {
        emit('startAddTrigger');
        emit('endDeleteTrigger');
      }
    }
  }
};
</script>

<template>
  <div class="scroll-dynamic" @scroll="onScroll">
    <slot />
  </div>
</template>

<style scoped>
.scroll-dynamic {
  overflow: hidden;
  height: 100%;
  overflow-y: auto;
  pointer-events: auto;
}
</style>
