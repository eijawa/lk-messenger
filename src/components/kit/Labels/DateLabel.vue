<template>
  <time
      class="date-label"
      :title="isRequiredTooltip ? localedDate : ''"
      :datetime="date"
  >{{ formattedDate }}</time>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  date: {
    type: String,
    required: true,
    default: () => new Date(Date.now()).toISOString(),
  },
  isOnlyTime: {
    type: Boolean,
    default: false,
  },
  isRequiredTooltip: {
    type: Boolean,
    default: false,
  },
  locale: {
    type: String,
    default: 'ru-RU',
  },
});

// TODO: Заменить затычки d = new Date(d),
// поскольку с сервера будет прилетать готовый DateTime...
// (вроде)

const localedTimeOptions = {
  hour: '2-digit',
  minute: '2-digit',
};

const localedDateOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  ...localedTimeOptions,
  second: 'numeric',
};

const convertedDate = new Date(props.date);

// eslint-disable-next-line arrow-body-style
const localedDate = computed(() => {
  return convertedDate.toLocaleDateString(props.locale, localedDateOptions);
});

const formatDate = d => {
  let result;

  const today = new Date(Date.now());

  const diffTime = today.getTime() - d.getTime();
  const diffHours = diffTime / (1000 * 3600);

  // Если с момента сообщения прошло меньше 24 часов,
  // либо если всегда нужно только время,
  // то выводим только время
  if (diffHours <= 24 || props.isOnlyTime) {
    result = d.toLocaleTimeString(props.locale, localedTimeOptions);
  }
  else if (diffHours > 24 && diffHours < 48) {
    result = 'Вчера';
  }
  else {
    result = d.toLocaleDateString();
  }

  return result;
};

const formattedDate = computed(() => formatDate(convertedDate));
</script>

<style lang="scss" scoped>
  .date-label {
    font-size: 0.75rem;

    color: inherit;
  }
</style>
