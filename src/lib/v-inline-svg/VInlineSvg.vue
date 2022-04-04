<script lang="ts" setup>
import { onMounted, defineProps } from 'vue';
import { downloadSvg } from '@/lib/v-inline-svg/VInlineSvgServices';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

onMounted(async () => {
  await downloadSvg(props.src);
});
</script>

<template>
  <div>
    123
  </div>
</template>
