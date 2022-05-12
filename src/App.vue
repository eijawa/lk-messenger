<script lang="ts" setup>
import AppProvider from '@/AppProvider.vue';
import MessengerLayout from '@/layout/MessengerLayout.vue';
import { useMessengerSettingsStore } from '@/stores/messengerSettingsStore';

const messengerSettingsStore = useMessengerSettingsStore();

let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
  messengerSettingsStore.$patch({
    isMobileVersion: window.innerWidth < 927,
  });
  vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
});
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
