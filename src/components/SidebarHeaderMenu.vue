<script lang="ts" setup>
import { LeftColumnComponentsName } from '@/types/MessengerSettings';
import { useMessengerSettingsStore } from '@/stores/messengerSettingsStore';
import { useGetCSSVariable } from '@/hooks/useCssVariables';
import VMenuButton from '@/components/kit/VMenuButton.vue';
import VIcon from '@/components/kit/VIcon.vue';
import SettingsIcon from '@/assets/icons/settings.svg?url';

const iconColor = useGetCSSVariable('--color-icon-secondary');
</script>

<template>
  <div class="sidebar-header-menu">
    <router-link :to="{ name: 'lang' }">
      <v-menu-button
        size="small"
        :font-size="0.875"
      >
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
    </router-link>
    <v-menu-button size="small" :font-size="0.875">
      <template #icon>
        <v-icon
          :src="SettingsIcon"
          name="settings"
          :size="20"
          :fill="iconColor"
        />
      </template>
      Пункт 2
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
      Пункт 3
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
      Пункт 4
    </v-menu-button>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-header-menu {
  width: 270px;
  padding: 0.25rem 0;
  display: flex;
  flex-direction: column;
}
</style>
