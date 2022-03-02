<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-loading-bar-provider>
      <n-message-provider>
        <n-dialog-provider>
          <slot></slot>
        </n-dialog-provider>
      </n-message-provider>
    </n-loading-bar-provider>
  </n-config-provider>
</template>

<script setup>
import {
  NConfigProvider,
  NLoadingBarProvider,
  NMessageProvider,
  NDialogProvider,
} from 'naive-ui';

const themeOverrides = {
  common: {
    // primaryColor: '#FF0000',
  },
  Button: {
    // textColor: '#FF0000',
  },
  Select: {
    peers: {
      InternalSelection: {
        // textColor: '#FF0000',
      },
    },
  },
};
</script>
