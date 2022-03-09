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
          <Transition name="menu-icon">
            <v-icon
              v-if="!isSearchActive"
              class="sidebar-header-action-icon"
              :src="MenuIcon"
              name="menu"
              :fill="sideBarActionFillColor" />
          </Transition>
          <Transition name="back-icon">
            <v-icon
              v-if="isSearchActive"
              class="sidebar-header-action-icon"
              :src="BackIcon"
              name="back"
              :fill="sideBarActionFillColor" />
          </Transition>
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
import BackIcon from '@/assets/icons/back.svg?url';
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
  justify-content: space-between;
  gap: 10px;

  .sibebar-header-action {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 2.75rem;
    height: 2.75rem;

    .sidebar-header-action-icon {
      position: absolute;
    }

    .menu-icon-enter-active {
      animation: menu-icon-in .3s;
    }

    .menu-icon-leave-active {
      animation: menu-icon-in .2s reverse;
    }

    @keyframes menu-icon-in {
      0% {
        opacity: 0;
        transform: rotate(0deg);
      }
      100% {
        opacity: 1;
        transform: rotate(-180deg);
      }
    }

    .back-icon-enter-active {
      animation: back-icon-in .3s;
    }

    .back-icon-leave-active {
      animation: back-icon-in .2s reverse;
    }

    @keyframes back-icon-in {
      0% {
        opacity: 0;
        transform: rotate(-180deg);
      }
      100% {
        opacity: 1;
        transform: rotate(0deg);
      }
    }
  }
}
</style>
