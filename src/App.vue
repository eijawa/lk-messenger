<template>
  <app-provider>
    <router-view />
  </app-provider>
</template>

<script setup>
import AppProvider from '@/AppProvider.vue';
</script>

<style lang="scss">
@import 'styles/global';
</style>
