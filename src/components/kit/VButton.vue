<template>
  <button
    ref="buttonRef"
    class="v-button-base"
    :class="[typeValue, fluidValue, roundValue, circleValue, ghostValue]"
    :style="{ height: buttonStyle.height + 'rem', fontSize: `${buttonStyle.fontSize}rem`, fontWeight: buttonStyle.fontWeight }"
    @click="onClick"
  >
    <span class="v-button-text"><slot name="default" /></span>
  </button>
</template>

<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
  size: {
    type: [String, Number],
    default: 'medium',
  },
  fluid: {
    type: Boolean,
    default: false,
  },
  round: {
    type: Boolean,
    default: false,
  },
  fontSize: {
    type: Number,
    default: 1,
  },
  fontWeight: {
    type: Number,
    default: 400,
  },
  circle: {
    type: Boolean,
    default: false,
  },
  ghost: {
    type: Boolean,
    default: false,
  },
});

const buttonRef = ref(null);
const typeValue = computed(() => props.type);
const fluidValue = computed(() => props.fluid ? 'fluid' : '');
const circleValue = computed(() => props.circle ? 'circle' : '');
const roundValue = computed(() => props.round ? 'round' : '');
const ghostValue = computed(() => props.ghost ? 'ghost' : '');
const fontSize = computed(() => props.fontSize);
const fontWeight = computed(() => props.fontWeight);

const sizeCalculate = size => {
  if (size === 'medium') {
    return 2.75;
  }

  if (size === 'small') {
    return 2;
  }

  return 3.5;
};

const sizeValue = computed(() => {
  if (typeof props.size === 'number') {
    return props.size;
  }
  return sizeCalculate(props.size);
});

const buttonStyle = computed(() => ({
  height: sizeValue.value,
  fontSize: fontSize.value,
  fontWeight: fontWeight.value,
  borderRadiusRound: `${sizeValue.value}rem`,
}));

const onClick = e => {
  const buttonSize = Math.max(buttonRef.value.offsetWidth, buttonRef.value.offsetHeight);
  const x = e.offsetX - buttonSize / 2;
  const y = e.offsetY - buttonSize / 2;

  const wave = document.createElement('span');
  wave.className = 'v-button-wave-effect';
  wave.style.cssText = `width: ${buttonSize}px; height: ${buttonSize}px;top: ${y}px; left:${x}px;`;

  buttonRef.value.appendChild(wave);
  setTimeout(() => wave.remove(), 500);
};
</script>

<style lang="scss" scoped>
@use "sass:color";

.v-button-base {
  position: relative;
  width: initial;
  display: inline-flex;
  flex-wrap: nowrap;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  text-align: center;
  line-height: var(--default-line-height);
  outline: none;
  margin: 0;
  cursor: pointer;
  overflow: hidden;
  text-decoration: none;
  user-select: none;
  border: none;
  padding: 0 1rem;
  border-radius: var(--border-radius-default-small);
  font-weight: 400;
  transition: color .2s ease, background-color .2s ease, opacity .2s ease, border-color .2s ease;
  background-color: transparent;

  .v-button-text {
    line-height: var(--default-line-height);
  }

  :global(.v-button-wave-effect) {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 50%;
    transform: scale(0);
    animation: v-button-wave-effect-animation .35s linear;
    pointer-events: none;
    position: absolute;
  }

  @keyframes v-button-wave-effect-animation {
    100% {
      transform: scale(2);
      opacity: 0;
    }
  }

  &.default {
    color: var(--color-text);
    background-color: var(--color-default);
    border: 1px solid var(--color-borders);

    &:hover {
      background-color: var(--color-default-shade);
      border: 1px solid var(--color-borders-input);
    }
  }

  &.primary {
    color: var(--color-primary);
    background-color: var(--color-primary);
    border: 1px solid var(--color-primary);

    &:hover {
      background-color: var(--color-primary-shade);
      border: 1px solid var(--color-primary-shade);
    }
  }

  &.success {
    color: var(--color-green);
    background-color: var(--color-green);
    border: 1px solid var(--color-green);

    &:hover {
      background-color: var(--color-green-shade);
      border: 1px solid var(--color-green-shade);
    }
  }

  &.warning {
    color: var(--color-warning);
    background-color: var(--color-warning);
    border: 1px solid var(--color-warning);

    &:hover {
      background-color: var(--color-warning-shade);
      border: 1px solid var(--color-warning-shade);
    }
  }

  &.error {
    color: var(--color-error);
    background-color: var(--color-error);
    border: 1px solid var(--color-error);

    &:hover {
      background-color: var(--color-error-shade);
      border: 1px solid var(--color-error-shade);
    }
  }

  &.fluid {
    width: 100%;
  }

  &.round {
    border-radius: v-bind('buttonStyle.borderRadiusRound');
  }

  &.circle {
    border-radius: 50%;
  }

  &:not(.ghost) {
    color: #ffffff;
    border: none;

    &:hover {
      border: none;
    }
  }

  &.ghost {
    background-color: transparent;

    &:hover {
      background-color: transparent;
    }
  }
}
</style>
