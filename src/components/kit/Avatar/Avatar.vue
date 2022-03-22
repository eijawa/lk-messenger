<template>
    <a-avatar
      class="avatar"
      :class="{ 'monochrome': isMonochrome && isGroup }"
      :style="{ background: defaultColor }"
      :src="src"
      shape="circle"
      :size="size"
    >
      <span v-if="!isGroup">{{ titleFirstLetters }}</span>
      <font-awesome-icon v-else :icon="['fas', 'user-group']" />
    </a-avatar>
</template>

<script setup>
import { computed } from 'vue';
import getFirstLetters from '@/use/useStringFormatter';

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  src: {
    type: String,
    default: '',
  },
  size: {
    type: Number,
    default: 54,
  },
  palette: {
    type: String,
    default: '',
  },
  isGroup: {
    type: Boolean,
    default: false,
  },
  isMonochrome: {
    type: Boolean,
    default: false,
  },
});

const defaultColor = computed(() => props.palette !== '' ? `var(--volsu-u-${props.palette}-gr)` : 'var(--color-gray)');
const titleFirstLetters = computed(() => getFirstLetters(props.title));
</script>

<style lang="scss" scoped>
.avatar {
  font-size: 1.15rem;
  font-weight: bold;

  &.monochrome {
    background: var(--color-white) !important;

    color: var(--color-black) !important;
  }
}
</style>
