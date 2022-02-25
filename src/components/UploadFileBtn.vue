<template>
  <a-upload>
    <a-button
      size="large"
      >
      <template #icon>
        <font-awesome-icon :icon="['fas', 'paperclip']" size="lg" />
      </template>
    </a-button>
  </a-upload>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.ant-btn:hover {
  color: var(--volsu-yellow);
  border-color: var(--volsu-yellow);
}
</style>