<template>
  <a-card
    class="message-card"
    :body-style="cardBodyStyle"
    :style="{ 'float': floatValue }"
  >
    <div class="spacer">
      <span class="message-card__text">{{ message.text }}</span>

      <div class="end spacer">
        <date-label
          :date="message.date"
          :is-required-tooltip="true"
          :is-only-time="true"
        ></date-label>
        <readed-label v-if="isYourMessage && message.isReaded"></readed-label>
      </div>
    </div>
  </a-card>
</template>

<script setup>
import { computed } from 'vue';

import ReadedLabel from '@/components/kit/Labels/ReadedLabel.vue';
import DateLabel from '@/components/kit/Labels/DateLabel.vue';

defineProps({
  message: {
    type: Object,
    default: () => { },
  },
});

const isYourMessage = computed(() => false);
const floatValue = computed(() => isYourMessage.value ? 'right' : 'left');
const bgValue = computed(() => isYourMessage.value ? '#fff' : 'var(--volsu-gray)');

// Благодаря этому можно не использовать :deep при изменении ant-card-body
const cardBodyStyle = {
  'padding': '0.1rem 0.75rem',
  'background': bgValue.value,
};
</script>

<style lang="scss" scoped>
.ant-card {
  width: max-content;
  max-width: 50%;
}

.ant-card > * {
  width: inherit;
  max-width: inherit;
}

.message-card__text {
  padding: 0.4rem 0;

  display: inline-block;
}

// Свойство gap не применимо к ant-card-body,
// поскольку элемент содержит в себе псевдо-элементы,
// а свойство gap влияет и на них, поэтому пришлось делать обёртку.
// end - временное решение
.spacer {
  display: flex;
  align-items: center;

  gap: 0.5rem;

  &.end {
    align-self: flex-end;
  }
}
</style>
