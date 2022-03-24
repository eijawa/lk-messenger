<script lang="ts" setup>
import VButton from '@/components/kit/VButton.vue';
import { inject } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { isChatOpenedChangeState } = inject('isChatOpened') ?? { isChatOpenedChangeState: null };
const onClickButtonBackHandler = () => {
  if (isChatOpenedChangeState !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    isChatOpenedChangeState(false);
  }
};

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const { isMoreInfoOpenedChangeState } = inject('isMoreInfoOpened') ?? { isMoreInfoOpenedChangeState: null };
const onClickButtonMoreInfoHandler = () => {
  if (isMoreInfoOpenedChangeState !== null) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    isMoreInfoOpenedChangeState(true);
  }
};
</script>

<template>
  <div class="middle-column-content">
    <v-button type="primary" @click="onClickButtonBackHandler">
      Назад
    </v-button>
    <v-button type="primary" @click="onClickButtonMoreInfoHandler">
      Информация
    </v-button>
    <div>
      <h4>Lorem</h4>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.middle-column-content {
  display: flex;
  flex-direction: column;
  width: 100%;
}
</style>
