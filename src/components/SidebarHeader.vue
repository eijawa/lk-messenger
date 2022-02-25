<template>
  <div class="sidebar-header">
    <a-space>
      <a-button type="text">
        <template #icon>
          <font-awesome-icon :icon="['fas', 'bars']" size="lg" />
        </template>
      </a-button>

      <multi-search-input></multi-search-input>
    </a-space>
  </div>
</template>

<script setup>
import MultiSearchInput from './MultiSearchInput.vue';

</script>

<style lang="scss" scoped>
.sidebar-header {
  width: 100%;

  padding: 10px 1rem;

  background-color: #fff;
}
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
