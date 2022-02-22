<script setup>
import { computed } from 'vue'
import { CheckCircleTwoTone } from '@ant-design/icons-vue'

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

const titleFirstLetters = computed(() => getFirstLetters(props.title));

const formattedDate = computed(() => formatDate(props.lastMessage?.date));

const getFirstLetters = (s) => {
  return s.split(' ').map(x => x[0]).join('');
};

const formatDate = (d) => {
  d = new Date(d);
  let _result;

  let _today = new Date(Date.now());

  let _diffTime = _today.getTime() - d.getTime();
  let _diffHours = _diffTime / (1000 * 3600);

  if (_diffHours <= 24) {
    _result = `${d.getHours()}:${d.getMinutes()}`;
  }
  else if (_diffHours > 24 || _diffHours < 48) {
    _result = 'Yesterday';
  }
  else {
    _result = d.toLocaleDateString();
  }

  return _result;
};

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
        >
          <a-typography-paragraph
            :content="title"
            ellipsis
          >
          </a-typography-paragraph>
        </a-tooltip>
        
        <a-space class="conversation-card__info">
          <check-circle-two-tone v-if="lastMessage?.isReaded" two-tone-color="#52c41a" />
          <span>{{ formattedDate }}</span>
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