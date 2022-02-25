<script setup>
import { computed } from 'vue'

const props = defineProps({
  date: {
    type: String,
    required: true,
    default: () => new Date(Date.now()).toISOString(),
  },
  isOnlyTime: {
    type: Boolean,
    default: false
  },
  isRequiredTooltip: {
    type: Boolean,
    default: false
  },
  locale: {
    type: String,
    default: 'ru-RU'
  }
});

// TODO: Заменить затычки d = new Date(d),
// поскольку с сервера будет прилетать готовый DateTime...
// (вроде)

const formattedDate = computed(() => formatDate(props.date));

const localedTimeOptions = {
  hour: '2-digit',
  minute: '2-digit'
};

const localedDateOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  ...localedTimeOptions,
  second: 'numeric'
};

const localedDate = computed(() => {
  let d = new Date(props.date);
  return d.toLocaleDateString(props.locale, localedDateOptions);
});

const formatDate = (d) => {
  d = new Date(d);
  let _result;

  let _today = new Date(Date.now());

  let _diffTime = _today.getTime() - d.getTime();
  let _diffHours = _diffTime / (1000 * 3600);

  // Если с момента сообщения прошло меньше 24 часов,
  // либо если всегда нужно только время,
  // то выводим только время
  if (_diffHours <= 24 || props.isOnlyTime) {
    _result = d.toLocaleTimeString(props.locale, localedTimeOptions);
  }
  else if (_diffHours > 24 || _diffHours < 48) {
    _result = 'Yesterday';
  }
  else {
    _result = d.toLocaleDateString();
  }

  return _result;
};
</script>

<template>
  <time
    class="date-label"
    :title="isRequiredTooltip ? localedDate : ''"
    :datetime="date"
  >{{ formattedDate }}</time>
</template>

<style lang="scss" scoped>
  .date-label {
    font-size: 0.75rem;
    letter-spacing: 24;

    color: inherit;
  }
</style>