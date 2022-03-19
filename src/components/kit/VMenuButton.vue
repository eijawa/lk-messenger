<template>
  <button
    ref="buttonBaseRef"
    class="v-button-menu-base"
    :class="[typeValue, disabledValue]"
    :style="{ fontSize: `${buttonMenuStyle.fontSize}rem`, fontWeight: buttonMenuStyle.fontWeight }"
    @click.stop="onClick"
  >
    <span class="v-button-menu-icon">
      <slot name="icon" />
    </span>
    <span class="v-button-menu-text"><slot name="default" /></span>
    <span class="v-button-menu-right">
      <slot name="right" />
    </span>
  </button>
</template>

<script setup>

import { ref, computed } from 'vue';

const props = defineProps({
  type: {
    type: String,
    default: 'default',
  },
  size: {
    type: [String, Number],
    default: 'medium',
  },
  fontSize: {
    type: Number,
    default: 1,
  },
  fontWeight: {
    type: Number,
    default: 500,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const buttonBaseRef = ref(null);
const typeValue = computed(() => props.type);
const disabledValue = computed(() => props.disabled ? 'disabled' : '');
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

const buttonMenuStyle = computed(() => ({
  height: `${sizeValue.value}rem`,
  fontSize: fontSize.value,
  fontWeight: fontWeight.value,
  borderRadiusRound: `${sizeValue.value}rem`,
}));

const vButtonWaveEffect = e => {
  const buttonMenuSize = Math.max(buttonBaseRef.value.offsetWidth, buttonBaseRef.value.offsetHeight);
  const x = e.offsetX - buttonMenuSize / 2;
  const y = e.offsetY - buttonMenuSize / 2;
  const wave = document.createElement('span');
  wave.className = 'v-button-wave-effect';
  wave.style.cssText = `width: ${buttonMenuSize}px; height: ${buttonMenuSize}px; top:${y}px; left:${x}px;`;

  buttonBaseRef.value.appendChild(wave);
  setTimeout(() => wave.remove(), 500);
};

const onClick = e => {
  if (disabledValue.value === '') {
    vButtonWaveEffect(e);
  }
};
</script>

<style lang="scss" scoped>
.v-button-menu-base {
  height: v-bind('buttonMenuStyle.height');
  position: relative;
  width: 100%;
  display: inline-flex;
  flex-wrap: nowrap;
  flex-shrink: 0;
  align-items: center;
  justify-content: flex-start;
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
  transition: color .2s ease, background-color .2s ease, opacity .2s ease, border-color .2s ease, box-shadow .2s ease;
  background-color: transparent;

  .v-button-menu-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  .v-button-menu-text {
    user-select: none;
    pointer-events: none;
    line-height: var(--default-line-height);
  }

  .v-button-menu-right {
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
  }

  :global(.v-button-wave-effect) {
    position: absolute;
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: scale(0);
    animation: v-button-wave-effect-animation .4s linear;
    pointer-events: none;
  }

  @keyframes v-button-wave-effect-animation {
    100% {
      transform: scale(2.5);
      opacity: 0;
    }
  }

  @keyframes v-button-border-effect-animation {
    100% {
      opacity: 0;
    }
  }
}
</style>
