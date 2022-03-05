<template>
  <div class="v-input-container-base" :class="[inputTypeValue]">
    <div
      class="v-input-field"
      :class="{ 'touched': isInputTouched }"
      style="">
      <span v-if="isLabelShowValue">{{ placeHolderValue }}</span>
      <div class="v-input-content">
        <input
          class="v-input"
          type="text"
          :class="{ 'touched': isInputTouched }"
          :style="{ height: inputStyle.height + 'rem' }"
          :value="value"
          @input="onInput"
          @focus="onFocus"
        />
        <label class="v-input-label">{{ placeHolderValue }}</label>
      </div>
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
  isLabelShow: {
    type: Boolean,
    default: true,
  },
  size: {
    type: [String, Number],
    default: 'medium',
  },
});

const emit = defineEmits(['update:value', 'focus']);

const placeHolderValue = computed(() => props.placeholder);

const isLabelShowValue = computed(() => props.isLabelShow && props.styleType !== 'form');

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
  top: `${sizeValue.value / 2 - 0.75}rem`,
  topAfterFocus: `-${0.8}rem`,
  transform: `scale(0.7) translate(0, -${(sizeValue.value / 2)}rem)`,
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
    width: 100%;

    .v-input-content {
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
        line-height: 1.5;
      }

      .v-input-label {
        display: block;
        position: absolute;
        left: 0.75rem;
        top: v-bind('labelStyle.top');
        padding: 0 0.25rem;
        font-size: 1rem;
        font-weight: 400;
        cursor: text;
        pointer-events: none;
        transform-origin: left center;
        white-space: nowrap;
        line-height: 1.5;
      }
    }
  }
}

.v-input-container-default {
  .v-input-field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;

    .v-input-content {
      .v-input {
        border-radius: var(--border-radius-default);
        padding: 0 calc(0.9rem - var(--border-width));
        border: none;
        background-color: var(--color-chat-hover);
      }

      &.touched label,
      .v-input.touched + label {
        display: none;
      }
    }
  }
}

.v-input-container-form {
  .v-input-content {
    .v-input {
      border-radius: var(--border-radius-default);
      border: var(--border-width) solid var(--color-borders-input);
      padding: 0 calc(0.9rem - var(--border-width));
      background-color: var(--color-background);
      color: var(--color-text);
      transition: border-color .15s ease;
    }

    .v-input:focus {
      border-color: var(--color-primary);
      box-shadow: inset 0 0 0 1px var(--color-primary);
      caret-color: var(--color-primary);
    }

    .v-input-label {
      background-color: var(--color-background);
      border: none;
      color: var(--color-placeholders);
      transition: top .15s ease-out, transform .15s ease-out, color .15s ease-out;
    }

    &.touched label,
    .v-input:focus + label,
    .v-input.touched + label {
      top: v-bind('labelStyle.topAfterFocus');
      transform: scale(0.8);
      color: var(--color-text-secondary);
    }

    .v-input:focus + label {
      color: var(--color-primary);
    }
  }
}


</style>
