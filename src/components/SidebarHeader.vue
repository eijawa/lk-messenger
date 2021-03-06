<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useGetCSSVariable } from '@/hooks/useCssVariables';
import VPopover from '@/components/kit/VPopover.vue';
import VInput from '@/components/kit/VInput.vue';
import VButton from '@/components/kit/VButton.vue';
import VIcon from '@/components/kit/VIcon.vue';
import SidebarHeaderMenu from '@/components/SidebarHeaderMenu.vue';
import MenuIcon from '@/assets/icons/menu.svg?url';
import BackIcon from '@/assets/icons/back.svg?url';
import SearchIcon from '@/assets/icons/search.svg?url';

const emit = defineEmits(['searchFocus', 'backClick', 'search']);

const isSearchActive = ref(false);

const searchQuery = ref('');

const onSearch = () => {
  emit('search', searchQuery.value);
};

const searchFillColorDefault = `rgba(${useGetCSSVariable('--color-text-secondary-rgb')}, 0.5)`;
const searchFillColorActive = useGetCSSVariable('--color-primary');
const searchFillColor = ref(searchFillColorDefault);

const sideBarActionFillColor = useGetCSSVariable('--color-text-secondary');

const onFocusHandler = () => {
  isSearchActive.value = true;
  searchFillColor.value = searchFillColorActive;
  emit('searchFocus');
};

const onFocusOutHandler = () => {
  searchFillColor.value = searchFillColorDefault;
};

const isShow = ref(false);
const onMenuClickHandler = () => {
  isShow.value = !isShow.value;
};

const onClickOutsideHandler = () => {
  isShow.value = false;
};

const onBackClickHandler = () => {
  searchQuery.value = '';
  isSearchActive.value = false;
  emit('backClick');
};

const onSideBarActionClickHandler = computed(() => (isSearchActive.value
  ? onBackClickHandler : onMenuClickHandler));
</script>

<template>
  <div class="sidebar-header">
    <v-popover
      :is-show="isShow"
      placement="bottom-start"
      to=".sidebar-header-menu-popover"
      @click-outside="onClickOutsideHandler"
    >
      <template #trigger>
        <div class="sibebar-header-action">
          <v-button
            type="default"
            class="sibebar-header-action-button"
            quaternary
            circle
            @click="onSideBarActionClickHandler"
          >
            <template #icon>
              <Transition name="menu-icon">
                <v-icon
                  v-show="!isSearchActive"
                  class="sidebar-header-action-icon"
                  :src="MenuIcon"
                  name="menu"
                  :fill="sideBarActionFillColor"
                />
              </Transition>
              <Transition name="back-icon">
                <v-icon
                  v-show="isSearchActive"
                  class="sidebar-header-action-icon"
                  :src="BackIcon"
                  name="back"
                  :fill="sideBarActionFillColor"
                />
              </Transition>
            </template>
          </v-button>
        </div>
      </template>
      <sidebar-header-menu />
    </v-popover>
    <v-input
      v-model:value="searchQuery"
      placeholder="Поиск"
      style-type="search"
      round
      @input="onSearch"
      @focus="onFocusHandler"
      @focusout="onFocusOutHandler"
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

<style lang="scss" scoped>
.sidebar-header {
  width: 100%;
  min-height: 64px;
  padding: 0 1rem 0 0.5rem;
  display: flex;
  align-items: center;
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
