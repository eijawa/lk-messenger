<script lang="ts" setup>
import {
  onBeforeRouteUpdate, useRoute, useRouter,
} from 'vue-router';
import {
  computed, provide, ref, watch,
} from 'vue';

import VLayoutSwiping from '@/components/kit/VLayoutSwiping.vue';

const router = useRouter();
const route = useRoute();

const transitionDurationMs = ref(90);

const backViewRoute = computed(() => (route.matched.length > 2 ? route.matched[
  route.matched.length - 2
] : null));

const frontViewRoute = computed(() => route.matched[
  route.matched.length - 1
]);

const isViewOpened = ref(true);
const isViewAnimated = ref(true);
const isGoBackEvent = ref(false);

const isViewOpenedChangeState = (state: boolean) => {
  console.log('swipe');
  if (backViewRoute.value !== null) {
    isViewOpened.value = state;
    setTimeout(async () => {
      await router.push({ name: backViewRoute.value?.name });
      isViewAnimated.value = false;
      isViewOpened.value = !state;
    }, transitionDurationMs.value);
    isViewAnimated.value = true;
  }
  isGoBackEvent.value = false;
};

// onBeforeRouteUpdate(() => {
//   if (!isGoBackEvent.value) {
//     console.log('ROUTE UPDATE');
//     isViewAnimated.value = false;
//     isViewOpened.value = false;
//   }
// });
//
// watch((frontViewRoute), () => {
//   if (!isGoBackEvent.value) {
//     console.log('VIEW MOUNT');
//     isViewAnimated.value = true;
//     isViewOpened.value = true;
//   }
// });

provide('isViewOpened', {
  isViewOpened,
  isViewOpenedChangeState,
});
</script>

<template>
  <div class="back-view">
    <component :is="backViewRoute.components.default" v-if="backViewRoute !== null" />
  </div>
  <v-layout-swiping
    :is-opened="isViewOpened"
    :is-active="backViewRoute !== null"
    :is-animated="isViewAnimated"
    :transition-duration-ms="transitionDurationMs"
    standing-style="modal"
    class="front-view"
    @close="isGoBackEvent = true; isViewOpenedChangeState(false)"
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
