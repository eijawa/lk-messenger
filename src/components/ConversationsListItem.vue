<script setup>
import { computed } from 'vue'

import ReadedLabel from './ReadedLabel.vue'
import DateLabel from './DateLabel.vue'

const props = defineProps({
  coverSrc: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  lastMessage: {
    type: Object,
    default: () => { }
  },
  newMessagesCount: {
    type: Number,
    default: 0
  }
});

const isYourMessage = computed(() => false);

const titleFirstLetters = computed(() => getFirstLetters(props.title));

const getFirstLetters = (s) => {
  return s.split(' ').map(x => x[0]).join('');
};

// Благодаря этому можно не использовать :deep при изменении ant-card-body
const cardBodyStyle = {
  'padding': '1rem'
};
</script>

<template>
  <a-card 
    class="conversation-card"
    :bordered="false"
    :body-style="cardBodyStyle"
    hoverable
  >
    <a-card-meta>
      <template #avatar>
        <a-avatar v-if="coverSrc != ''"></a-avatar>
        <a-avatar v-else size="large" style="background-color: var(--volsu-yellow)">{{ titleFirstLetters }}</a-avatar>
      </template>

      <template #title>
        <a-tooltip
          placement="bottom"
          :title="title"
          mouse-enter-delay="0.6"
        >
          <a-typography-paragraph
            :content="title"
            strong
            ellipsis
          >
          </a-typography-paragraph>
        </a-tooltip>
        
        <a-space class="conversation-card__info">
          <readed-label
            v-if="isYourMessage"
            :is-readed="lastMessage?.isReaded"
          ></readed-label>
          <date-label
            :date="props.lastMessage?.date"
          ></date-label>
        </a-space>
      </template>

      <template #description>
        <a-typography-paragraph
          :content="lastMessage?.text"
          ellipsis
        >
        </a-typography-paragraph>
        <a-tag v-if="newMessagesCount != 0" color="var(--volsu-deep-blue)">{{ newMessagesCount }}</a-tag>
      </template>
    </a-card-meta>
  </a-card>
</template>

<style lang="scss" scoped>
.conversation-card {

  &__info {
    margin-left: 0.5rem;
  }

  :deep(.ant-card-meta-detail > *) {
    width: 100%;

    display: inline-flex;
    justify-content: space-between;
  }

  :deep(.ant-card) {
    border-radius: 0 !important;
  }

  .ant-card-meta {
    display: flex;
    place-items: center;
  }

  .ant-typography {
    margin-bottom: 0;
  }

  .ant-tag {
    margin-left: 0.5rem;
    margin-right: 0;
  }
}
</style>