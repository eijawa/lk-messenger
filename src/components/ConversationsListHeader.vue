<script setup>
import { MenuOutlined, PlusOutlined } from '@ant-design/icons-vue'

import SearchConversationsInput from './SearchConversationsInput.vue'

</script>

<template>
  <a-space>
    <a-button ghost>
      <template #icon>
        <menu-outlined />
      </template>
    </a-button>

    <search-conversations-input></search-conversations-input>

    <!-- <a-tooltip placement="bottom">
      <template #title>
        Add contact
      </template>

      <a-button ghost>
        <template #icon>
          <plus-outlined />
        </template>
      </a-button>
    </a-tooltip> -->
  </a-space>
</template>

<style lang="scss" scoped>
.ant-space {
  width: 100%;

  :deep(.ant-space-item:last-of-type) {
    width: 100%;
  }
}

.ant-input-search {
  height: min-content;
}
</style>