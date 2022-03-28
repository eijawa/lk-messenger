<script lang="ts" setup>
import VButton from '@/components/kit/VButton.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const changeLang = async (tmp: string) => {
  await router.push({ name: tmp });
};

</script>

<template>
  <div class="settings">
    <div>Настройки</div>
    <router-link :to="{ name: 'lang' }">
      <v-button type="primary">
        Изменить язык
      </v-button>
    </router-link>
  </div>
</template>

<style lang="scss" scoped>
.settings {
  height: 100%;
  width: 100%;
}
</style>
