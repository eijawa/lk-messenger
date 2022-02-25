<template>
  <a-input-search
      v-model:value="searchValue"
      placeholder="Search"
      :bordered="false"
      @search="onSearch"
  >

  </a-input-search>
</template>

<script setup>
// Решил вынести поиск по сообщениям в отдельный компонент, чтобы не перегружать App

import { ref } from 'vue';

const searchValue = ref('');

const onSearch = sVal => {
  console.log(`Search value: ${sVal}`);
};
</script>

<style lang="scss" scoped>
</style>
