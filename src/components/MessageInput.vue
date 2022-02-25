<template>
  <a-input-search
      v-model:value="inputValue"
      placeholder="Write a message..."
      size="large"
      @search="onSearch"
  >
    <template #enterButton>
      <a-button>
        <template #icon>
          <send-outlined />
        </template>
      </a-button>
    </template>
  </a-input-search>
</template>

<script setup>
// Решил вынести инпут в отдельный компонент, чтобы не перегружать App

import { ref } from 'vue';

const inputValue = ref('');

const onSearch = sVal => {
  console.log(`Send value: ${sVal}`);
};
</script>

<style lang="scss" scoped>

</style>
