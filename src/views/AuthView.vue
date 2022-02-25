<template>
  <div class="auth-module">
    <a-spin />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

onMounted(() => {
  const { jwt } = route.query;
  if (typeof jwt === 'string') {
    localStorage.setItem('jwt', jwt);
    router.push({ path: '/' });
  }
});
</script>

<style lang="scss" scoped>
.auth-module {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
