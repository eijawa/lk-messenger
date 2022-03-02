<template>
  <div class="v-input-container-base" :class="[inputTypeValue]">
    <div class="v-input-field" :class="{ 'touched': isInputTouched }">
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
import { computed, ref } from 'vue';

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
    type: String,
    default: 'medium',
  },
});

const emit = defineEmits(['update:value', 'focus']);

const placeHolderValue = computed(() => props.placeholder);

const inputTypeValue = computed(() => `v-input-container-${props.styleType}`);

const isInputTouched = computed(() => props.value);

const sizeValue = computed(() => {
  if (props.size === 'medium') {
    return 3.375;
  }
  if (props.size === 'large') {
    return 4;
  }
  return 2;
});

const inputStyle = computed(() => ({
  height: sizeValue.value,
}));

const labelStyle = computed(() => ({
  bottom: inputStyle.value.height / 2 - 1 + 0.25,
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

  .v-input-field {
    position: relative;
    width: 100%;

    .v-input {
      display: block;
      width: 100%;
      font-size: 1rem;
      line-height: 1.25rem;
      word-break: break-word;
      -webkit-appearance: none;
      outline: none;
      -webkit-appearance: none;
      padding: calc(0.75rem - var(--border-width)) calc(0.9rem - var(--border-width));
      border: var(--border-width) solid #4dcd5e;
    }

    .v-input-label {
      display: block;
      position: absolute;
      left: 0.75rem;
      padding: 0 0.25rem;
      font-size: 1rem;
      line-height: 1.5rem;
      font-weight: 400;
      transition: transform .15s ease-out, color .15s ease-out;
      cursor: text;
      pointer-events: none;
      transform-origin: left center;
      white-space: nowrap;
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
      transform: scale(0.75) translate(0, -2.25rem);
    }

    .v-input-label {
      background-color: #fff;
    }
  }
}


</style>
