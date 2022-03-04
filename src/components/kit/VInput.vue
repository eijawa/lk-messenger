<template>
  <div class="v-input-container-base" :class="[inputTypeValue]">
    <div
      class="v-input-field"
      :class="{ 'touched': isInputTouched }"
      style="">
      <input
        class="v-input"
        type="text"
        :class="{ 'touched': isInputTouched }"
        :style="{ height: inputStyle.height + 'rem' }"
        :value="value"
        @input="onInput"
        @focus="onFocus"
      />
      <label class="v-input-label" :style="{ top: labelStyle.bottom + 'rem' }">{{ placeHolderValue }}</label>
    </div>
    <div class="v-input-messages"></div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  value: {
    type: [String, Number, null],
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  styleType: {
    type: String,
    default: 'default',
  },
  size: {
    type: [String, Number],
    default: 'large',
  },
});

const emit = defineEmits(['update:value', 'focus']);

const placeHolderValue = computed(() => props.placeholder);

const inputTypeValue = computed(() => `v-input-container-${props.styleType}`);

const isInputTouched = computed(() => props.value);

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

const inputStyle = computed(() => ({
  height: sizeValue.value,
}));

const labelStyle = computed(() => ({
  bottom: sizeValue.value / 2 - 0.75,
  transform: `scale(0.7) translate(0, -${(sizeValue.value / 2) + (0.3 * 1.5)}rem)`,
}));

const onInput = event => {
  emit('update:value', event.target.value);
};

const onFocus = () => {
  emit('focus');
};
</script>

<style lang="scss" scoped>

.v-input-container-base {
  width: 100%;
  --border-width: 1px;

  .v-input-field {
    position: relative;
    width: 100%;

    .v-input {
      display: block;
      width: 100%;
      font-size: 1rem;
      word-break: break-word;
      -webkit-appearance: none;
      outline: none;
      -webkit-appearance: none;
      border: var(--border-width) solid var(--color-borders-input);
      padding: 0 calc(0.9rem - var(--border-width));
      line-height: 1.5;
    }

    .v-input-label {
      display: block;
      position: absolute;
      left: 0.75rem;
      padding: 0 0.25rem;
      font-size: 1rem;
      font-weight: 400;
      transition: transform .15s ease-out, color .15s ease-out;
      cursor: text;
      pointer-events: none;
      transform-origin: left center;
      white-space: nowrap;
      line-height: 1.5;
    }
  }
}

.v-input-container-default {
  .v-input-field {

    &.touched,
    &.v-input:focus {
      .v-input-label {
        display: none;
      }
    }

    .v-input {
      border-radius: var(--border-radius-default);
    }
  }
}

.v-input-container-form {
  .v-input-field {
    .v-input {
      border-radius: var(--border-radius-default);
    }

    &.touched label,
    .v-input:focus + label,
    .v-input.touched + label {
      transform: v-bind('labelStyle.transform');
    }

    .v-input-label {
      background-color: #fff;
    }
  }
}


</style>
