<template>
  <div class="sidebar-header-menu">
    <v-menu-button size="small" :font-size="0.875">
      <template #icon>
        <v-icon
          :src="SettingsIcon"
          name="settings"
          :size="20"
          :fill="iconColor"
        />
      </template>
      Настройки
    </v-menu-button>
    <v-menu-button size="small" :font-size="0.875">
      <template #icon>
        <v-icon
          :src="SettingsIcon"
          name="settings"
          :size="20"
          :fill="iconColor"
        />
      </template>
      Настройки
    </v-menu-button>
    <v-menu-button size="small" :font-size="0.875">
      <template #icon>
        <v-icon
          :src="SettingsIcon"
          name="settings"
          :size="20"
          :fill="iconColor"
        />
      </template>
      Настройки
    </v-menu-button>
    <v-menu-button size="small" :font-size="0.875">
      <template #icon>
        <v-icon
          :src="SettingsIcon"
          name="settings"
          :size="20"
          :fill="iconColor"
        />
      </template>
      Настройки
    </v-menu-button>
  </div>
</template>

<script setup>
import { getCSSVariable } from '@/helpers/cssVariablesHelper';
import VMenuButton from '@/components/kit/VMenuButton.vue';
import VIcon from '@/components/kit/VIcon.vue';
import SettingsIcon from '@/assets/icons/settings.svg?url';

const iconColor = getCSSVariable('--color-icon-secondary');
</script>

<style lang="scss" scoped>
.sidebar-header-menu {
  width: 270px;
  padding: 0.25rem 0;
  display: flex;
  flex-direction: column;
}
</style>
