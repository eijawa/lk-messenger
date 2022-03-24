<script lang="ts" setup>
import { inject } from 'vue';
import VButton from '@/components/kit/VButton.vue';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { isMoreInfoOpenedChangeState } = inject('isMoreInfoOpened') ?? { isMoreInfoOpenedChangeState: null };
const onClickButtonBackHandler = () => {
  if (isMoreInfoOpenedChangeState !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    isMoreInfoOpenedChangeState(false);
  }
};
</script>

<template>
  <div class="right-column-content">
    <v-button type="primary" @click="onClickButtonBackHandler">
      Назад
    </v-button>
    <div>
      <h4>Lorem</h4>
    </div>
  </div>
</template>

<style scoped>

</style>
