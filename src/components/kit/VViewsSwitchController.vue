<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { computed, provide, ref } from 'vue';

import VLayoutSwiping from '@/components/kit/VLayoutSwiping.vue';

const router = useRouter();
const route = useRoute();

const backViewRoute = computed(() => (route.matched.length > 2 ? route.matched[
  route.matched.length - 2
] : null));

const frontViewRoute = computed(() => route.matched[
  route.matched.length - 1
]);

const isViewOpened = ref(true);
const isViewOpenedChangeState = async (state: boolean) => {
  if (backViewRoute.value !== null) {
    isViewOpened.value = state;
    await router.push({ name: backViewRoute.value?.name });
    isViewOpened.value = !state;
    console.log(frontViewRoute);
  }
};

provide('isViewOpened', {
  isViewOpened,
  isViewOpenedChangeState,
});
</script>

<template>
  <div class="back-view">
    <component :is="backViewRoute.components.default" v-if="backViewRoute !== null" />
    <div v-else>
      123
    </div>
  </div>
  <v-layout-swiping
    :is-opened="isViewOpened"
    standing-style="modal"
    class="front-view"
    @close="isViewOpenedChangeState(false)"
  >
    <component :is="frontViewRoute.components.default" />
  </v-layout-swiping>
</template>

<style lang="scss" scoped>
.back-view {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: relative;

  @media (max-width: 926px) {
    position: fixed;
    left: 0;
    top: 0;
    height: calc(var(--vh, 1vh) * 100);
  }
}

.front-view {
  background-color: #ffffff;
  width: 100%;
  z-index: 1;
}
</style>
