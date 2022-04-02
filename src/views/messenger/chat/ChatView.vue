<script lang="ts" setup>
import VButton from '@/components/kit/VButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
  <div class="middle-column-content">
    <v-button type="primary" @click="router.push({ name: 'messenger' })">
      Назад
    </v-button>
    <v-button type="primary" @click="router.push({ name: 'chatInfo' })">
      Информация
    </v-button>
    <div>
      <h4>Lorem</h4>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.middle-column-content {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #ffffff;
}
</style>
