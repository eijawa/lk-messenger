<template>
  <div class="sidebar-header">
    <a-button type="text" @click="headerHandler">
      <template #icon>
        <v-icon :src="BurgerIcon" name="burger" />
      </template>
    </a-button>

    <v-input
      v-model:value="searchQuery"
      placeholder="Поиск"
      style-type="default"
      @input="onSearch"
      @focus="onFocus"
    />
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import VInput from '@/components/kit/VInput.vue';
import VIcon from '@/components/kit/VIcon.vue';
import BurgerIcon from '@/assets/icons/burger.svg?url';

const emit = defineEmits(['searchFocus', 'backClick', 'search']);

const isSearchActive = ref(false);

const searchQuery = ref('');

const headerIcon = computed(() => (isSearchActive.value ? ['fa', 'chevron-left'] : ['fas', 'bars']));

const onSearch = () => {
  emit('search', searchQuery.value);
};

const onFocus = () => {
  isSearchActive.value = true;
  emit('searchFocus');
};

const menuClickHandler = () => {
  //
};

const backClickHandler = () => {
  searchQuery.value = '';
  isSearchActive.value = false;
  emit('backClick');
};

const headerHandler = computed(() => (isSearchActive.value ? backClickHandler : menuClickHandler));
</script>

<style lang="scss" scoped>
.sidebar-header {
  width: 100%;
  padding: 10px 1rem;
  background-color: #fff;
  display: flex;
  gap: 10px;
}

.ant-input-search {
  height: min-content;
}
</style>
