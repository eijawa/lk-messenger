<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  const { jwt } = route.query;
  if (typeof jwt === 'string') {
    localStorage.setItem('jwt', jwt);
    await router.push({ path: '/' });
  }
});
</script>

<template>
  <div class="auth-module">
    Загрузка...
  </div>
</template>

<style lang="scss" scoped>
.auth-module {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
