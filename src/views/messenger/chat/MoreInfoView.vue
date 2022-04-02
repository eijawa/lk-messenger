<script lang="ts" setup>
import VButton from '@/components/kit/VButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="right-column-content">
    <v-button type="primary" @click="router.push({ name: 'chat' })">
      Назад
    </v-button>
    <div>
      <h4>Lorem</h4>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.right-column-content {
  height: 100%;
  width: 100%;
  background-color: #ffffff;
}
</style>
