<script setup>
import { PaperClipOutlined } from '@ant-design/icons-vue'
</script>

<template>
  <a-upload>
    <a-button
      size="large"
      >
      <template #icon>
        <paper-clip-outlined />
      </template>
    </a-button>
  </a-upload>
</template>

<style lang="scss" scoped>
.ant-btn:hover {
  color: var(--volsu-yellow);
  border-color: var(--volsu-yellow);
}
</style>