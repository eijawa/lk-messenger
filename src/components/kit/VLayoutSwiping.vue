<script lang="ts" setup>
import { computed, ref } from 'vue';

const props = defineProps({
  isOpened: {
    type: Boolean,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  transitionDurationMs: {
    type: Number,
    default: 90,
  },
});

const emit = defineEmits(['close', 'transition-close-end']);

const transition = computed(() => `transform ${props.transitionDurationMs}ms linear`);

const transitionEndHandler = (e: TransitionEvent) => {
  if (e.elapsedTime === props.transitionDurationMs / 1000) {
    emit('transition-close-end');
  }
};

let touchDistanceX = 0;
const viewTransform = ref('translateX(0)');
const touchStartValue = {
  x: 0,
  y: 0,
};

let dateStart = 0;

let isSecondTouch = false;
const isXTouch = ref(false);

const touchStartHandler = (e: TouchEvent) => {
  touchStartValue.x = e.changedTouches[0].clientX;
  touchStartValue.y = e.changedTouches[0].clientY;
  dateStart = Date.now();
};

const touchMoveHandler = (e: TouchEvent) => {
  const touchDistanceTmp = touchDistanceX;
  touchDistanceX = Math.round(e.touches[0].clientX - touchStartValue.x);

  if (!isSecondTouch && props.isActive) {
    isSecondTouch = true;
    if (touchDistanceX > 1 && Math.abs(e.touches[0].clientY - touchStartValue.y) < 7
      && window.innerWidth < 927) {
      isXTouch.value = true;
    }
  }

  if (isXTouch.value) {
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

const touchEndHandler = (e: TouchEvent) => {
  const dateEnd = Date.now();
  const touchDistance = Math.sqrt((e.changedTouches[0].clientX - touchStartValue.x) ** 2
    + (e.changedTouches[0].clientY - touchStartValue.y) ** 2);

  const touchSeconds = (dateEnd - dateStart) / 1000;
  const touchSpeed = touchDistance / touchSeconds;

  if (isXTouch.value && (touchDistanceX > 140 || (touchDistanceX > 30 && touchSpeed > 549))) {
    emit('close');
  }

  isXTouch.value = false;
  isSecondTouch = false;
  viewTransform.value = 'translateX(0)';
};
</script>

<template>
  <div
    class="layout-swiping"
    :class="[
      {
        'layout-swiping-opened': props.isOpened,
        'layout-swiping-touch-start': isXTouch,
      }
    ]"
    :style="{ transform: viewTransform }"
    @touchstart.passive="touchStartHandler"
    @touchmove.passive="touchMoveHandler"
    @touchend.passive="touchEndHandler"
    @touchcancel.passive="touchEndHandler"
    @transitionend="transitionEndHandler"
  >
    <div class="layout-swiping-content">
      <slot name="default" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.layout-swiping {
  display: flex;
  position: relative;
  min-width: 0;
  height: 100%;
  width: 100%;

  .layout-swiping-content {
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  &:not(.layout-swiping-opened) {
    transform: unset;
  }

  @media (max-width: 926px) {
    position: fixed;
    left: 0;
    top: 0;
    height: calc(var(--vh, 1vh) * 100);
    animation-timing-function: linear;
    overflow: hidden;
    transition: none;
    transform: unset;

    &:not(.layout-swiping-touch-start) {
      transition: transform .1s linear;
    }

    &:not(.layout-swiping-opened) {
      transition: v-bind('transition');
    }

    &.layout-swiping-touch-start {
      .layout-swiping-content {
        touch-action: none;
        overflow: hidden;
      }
    }

    &.layout-swiping-animated-disable {
      transition: none;
      animation-timing-function: unset;
    }

    &.layout-swiping-instants-render {
      transition: none;
      animation-timing-function: unset;
    }

    &:not(.layout-swiping-opened) {
      transform: translateX(500px) !important;
    }
  }
}
</style>
