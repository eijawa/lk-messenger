<script lang="ts" setup>
import AppProvider from '@/AppProvider.vue';
import { useRouter } from 'vue-router';
import { routesDesktop } from '@/routes/router';

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});

const router = useRouter();

// if (window.innerWidth > 926) {
//   console.log('Route replace');
//   router.getRoutes().forEach(route => {
//     if (typeof route.name !== 'undefined') {
//       router.removeRoute(route.name);
//     }
//   });
//   routesDesktop.forEach(route => {
//     router.addRoute(route);
//   });
//
//   console.log(router.getRoutes());
// }
</script>

<template>
  <app-provider>
    <router-view />
  </app-provider>
</template>

<style lang="scss">
@import 'styles/index';

#app {
  height: 100%;

  @media (max-width: 926px) {
    height: calc(var(--vh, 1vh) * 100);
  }
}

.n-config-provider {
  height: 100%;

  @media (max-width: 926px) {
    height: calc(var(--vh, 1vh) * 100);
  }
}
</style>
