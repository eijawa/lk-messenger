<template>
  <div
    class="messenger-main"
    :class="{ 'messenger-main-opened': isChatOpened, 'messenger-touch-start': touchStart }"
    :style="{ transform: viewTransform }"
    @touchstart="touchStartHandler"
    @touchmove="touchMoveHandler"
    @touchend="touchEndHandler"
    @touchcancel="touchEndHandler">
    <div style="margin-top: 5rem">
      <h3>Transform start: {{ transformStartRef }}</h3>
      <h3>Touch distance: {{ touchDistanceRef }}</h3>
      <h3>Touch seconds: {{ touchSecondsRef }}</h3>
      <h3>Touch distanceX: {{ touchDistanceXRef }}</h3>
      <h3>Touch speed: {{ touchSpeedRef }}</h3>
    </div>
    <slot name="default" />
  </div>
</template>

<script setup>
import { useMessengerSettingsStore } from '@/stores/messengerSettingsStore';
import { computed, ref } from 'vue';

const messengerSettingsStore = useMessengerSettingsStore();
const isChatOpened = computed(() => messengerSettingsStore.isChatOpened);

let touchStartValue = {
  x: 0,
  y: 0,
};

let touchStartX = 0;
let touchDistanceX = 0;
let touchYdifference = 0;
const touchStart = ref(false);
let transformStart = false;
let dateStart = null;
let touchStartPoint = null;
const viewTransform = ref('translateX(0)');

const transformStartRef = ref(null);

let isSecondTouch = false;
let isXTouch = false;
const touchStartHandler = e => {
  touchStartX = e.changedTouches[0].clientX;

  dateStart = Date.now();

  touchStartPoint = e.changedTouches[0];
  transformStart = false;
  transformStartRef.value = false;
};

const touchMoveHandler = e => {
  const touchDistanceTmp = touchDistanceX;
  touchDistanceX = Math.round(e.touches[0].clientX - touchStartX);

  if (!isSecondTouch) {
    isSecondTouch = true;
    if (touchDistanceX > 1 && Math.abs(e.touches[0].clientY - touchStartPoint.clientY) < 7) {
      isXTouch = true;
    }
  }

  if (touchDistanceX > 0 && isXTouch) {
    transformStart = true;
    transformStartRef.value = true;
    touchStart.value = true;
  }

  if (transformStart && isXTouch) {
    if (touchDistanceX > touchDistanceTmp && touchDistanceX > 0) {
      for (let i = touchDistanceTmp; i < touchDistanceX; i += 1) {
        viewTransform.value = `translateX(${i}px)`;
      }
    } else if (touchDistanceX > 0) {
      for (let j = touchDistanceTmp; j > touchDistanceX; j -= 1) {
        viewTransform.value = `translateX(${j}px)`;
      }
    } else {
      viewTransform.value = 'translateX(0)';
    }
  }
};


const touchDistanceRef = ref(null);
const touchSecondsRef = ref(null);
const touchDistanceXRef = ref(null);
const touchSpeedRef = ref(null);
const touchEndHandler = e => {
  touchStart.value = false;
  transformStart = false;
  const dateEnd = Date.now();
  const touchDistance = Math.sqrt((e.changedTouches[0].clientX - touchStartPoint.clientX) ** 2 + (e.changedTouches[0].clientY - touchStartPoint.clientY) ** 2);

  const touchSeconds = (dateEnd - dateStart) / 1000;
  const touchSpeed = touchDistance / touchSeconds;

  touchDistanceRef.value = touchDistance;
  touchSecondsRef.value = touchSeconds;
  touchDistanceXRef.value = touchDistanceX;
  touchSpeedRef.value = touchSpeed;
  transformStartRef.value = false;


  if (isXTouch && (touchDistanceX > 140 || (touchDistanceX > 30 && touchSpeed > 549))) {
    messengerSettingsStore.$patch({
      isChatOpened: false,
    });
  }

  isSecondTouch = false;
  isXTouch = false;
  viewTransform.value = 'translateX(0)';
};
</script>

<style lang="scss" scoped>
.messenger-main {
  display: flex;
  position: relative;
  min-width: 0;
  height: 100%;
  width: 100%;
  z-index: 1;

  background-color: #f0f2f5;

  .layout-touch-test {
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow-y: scroll;
  }

  &:not(.messenger-main-opened) {
    transform: unset;
  }

  @media (max-width: 926px) {
    position: fixed;
    left: 0;
    top: 0;
    height: calc(var(--vh, 1vh) * 100);
    animation-timing-function: linear;
    overflow: hidden;
    //transition: transform 150ms linear;


    &:not(.messenger-touch-start) {
      //transition: transform .2s cubic-bezier(0.8, 1, 0.68, 1);
      transition: transform .09s linear;
    }

    &.messenger-touch-start {
      .layout-touch-test {
        touch-action: none;
        overflow: hidden;
      }
    }

    &:not(.messenger-main-opened) {
      transform: translateX(100vw) !important;
    }
  }
}
</style>
