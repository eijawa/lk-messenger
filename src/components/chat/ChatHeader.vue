<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { useMessengerSettingsStore } from '@/stores/messengerSettingsStore';
import { useGetCSSVariable } from '@/hooks/useCssVariables';
import VAvatar from '@/components/kit/VAvatar.vue';
import VButton from '@/components/kit/VButton.vue';
import VIcon from '@/components/kit/VIcon.vue';
import BackIcon from '@/assets/icons/back.svg?url';

const router = useRouter();
const messengerSettingsStore = useMessengerSettingsStore();
const isMobileVersion = computed(() => messengerSettingsStore.isMobileVersion);

const actionFillColor = useGetCSSVariable('--color-text-secondary');
</script>

<template>
  <div class="chat-header">
    <div class="chat-header-left">
      <v-button
        v-if="isMobileVersion"
        type="default"
        class="chat-header-back"
        quaternary
        circle
        @click="router.push({ name: 'messenger' })"
      >
        <template #icon>
          <v-icon
            class="sidebar-header-action-icon"
            :src="BackIcon"
            name="back"
            :fill="actionFillColor"
          />
        </template>
      </v-button>
      <div class="chat-header-info">
        <v-avatar
          title="Мостовой Максим"
          :src="undefined"
          :size="2.5"
        />
        <div class="chat-header-info-labels">
          <h3 class="chat-header-title">
            Мостовой Максим
          </h3>
          <div class="chat-header-label">
            last seen recently
          </div>
        </div>
      </div>
    </div>
    <div class="chat-header-right" />
  </div>
</template>

<style lang="scss" scoped>
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-height: 64px;
  padding: 0.5rem 1rem 0.5rem 0.5rem;
  background-color: var(--color-background);

  .chat-header-left {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .chat-header-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .chat-header-info-labels {
        .chat-header-title {
          line-height: 1.3rem;
          color: var(--color-text);
        }

        .chat-header-label {
          font-size: .875rem;
          line-height: 1.125rem;
          color: var(--color-text-secondary);
        }
      }
    }
  }
}
</style>
