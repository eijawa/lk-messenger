<template>
  <div class="sidebar-header">
    <div class="sibebar-header-action">
      <v-button
        type="default"
        quaternary
        circle
        @click="sideBarActionClickHandler"
      >
        <template #icon>
          <v-icon
            :src="MenuIcon"
            name="menu or back"
            :fill="sideBarActionFillColor" />
        </template>
      </v-button>
    </div>

    <v-input
      v-model:value="searchQuery"
      placeholder="Поиск"
      style-type="search"
      round
      @input="onSearch"
      @focus="onFocus"
      @focusout="onFocusOut"
    >
      <template #prefix>
        <v-icon
          name="search"
          :src="SearchIcon"
          :fill="searchFillColor"
        />
      </template>
    </v-input>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue';
import VInput from '@/components/kit/VInput.vue';
import VButton from '@/components/kit/VButton.vue';
import VIcon from '@/components/kit/VIcon.vue';
import MenuIcon from '@/assets/icons/menu.svg?url';
import SearchIcon from '@/assets/icons/search.svg?url';

const emit = defineEmits(['searchFocus', 'backClick', 'search']);

const isSearchActive = ref(false);

const searchQuery = ref('');

const onSearch = () => {
  emit('search', searchQuery.value);
};

const root = document.querySelector(':root');
const rootStyle = getComputedStyle(root);
const searchFillColorDefault = `rgba(${rootStyle.getPropertyValue('--color-text-secondary-rgb')}, 0.5)`;
const searchFillColorActive = rootStyle.getPropertyValue('--color-primary');
const searchFillColor = ref(searchFillColorDefault);

const sideBarActionFillColor = rootStyle.getPropertyValue('--color-text-secondary');

const onFocus = () => {
  isSearchActive.value = true;
  searchFillColor.value = searchFillColorActive;
  emit('searchFocus');
};

const onFocusOut = () => {
  searchFillColor.value = searchFillColorDefault;
};

const menuClickHandler = () => {
  //
};

const backClickHandler = () => {
  searchQuery.value = '';
  isSearchActive.value = false;
  emit('backClick');
};

const sideBarActionClickHandler = computed(() => (isSearchActive.value ? backClickHandler : menuClickHandler));
</script>

<style lang="scss" scoped>
.sidebar-header {
  width: 100%;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  background-color: #fff;
  display: flex;
  gap: 10px;

  .sibebar-header-action {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
