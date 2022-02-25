<template>
  <div class="sidebar-header">
    <a-button type="text">
      <template #icon>
        <font-awesome-icon :icon="['fas', 'bars']" size="lg" />
      </template>
    </a-button>

    <a-input
      v-model:value="searchQuery"
      placeholder="input search text"
      @input="onSearch"
      @focus="onFocus"
      @focusout="outFocus"
    />
  </div>
</template>

<script setup>
import MultiSearchInput from '@/components/MultiSearchInput.vue';
import { ref } from 'vue';

const emit = defineEmits(['searchFocus', 'searchFocusOut', 'search']);

const searchQuery = ref('');

const onSearch = query => {
  emit('search', searchQuery.value);
};

const onFocus = () => {
  emit('searchFocus');
};

const outFocus = () => {
  searchQuery.value = '';
  emit('searchFocusOut');
};
</script>

<style lang="scss" scoped>
.sidebar-header {
  width: 100%;
  padding: 10px 1rem;
  background-color: #fff;
  display: flex;
  gap: 10px;
}



.ant-input-search {
  height: min-content;
}
</style>
