<template>
  <div class="components-testing-container">
    <div class="components-container">
      <h3>Buttons</h3>
      <div class="components-groups">
        <div>Basic</div>
        <div class="components-list">
          <v-button type="default">Default</v-button>
          <v-button type="primary">Primary</v-button>
          <v-button type="success">Success</v-button>
          <v-button type="warning">Warning</v-button>
          <v-button type="error">Error</v-button>
        </div>
      </div>

      <div class="components-groups">
        <div>Ghost</div>
        <div class="components-list">
          <v-button type="default" ghost>Default</v-button>
          <v-button type="primary" ghost>Primary</v-button>
          <v-button type="success" ghost>Success</v-button>
          <v-button type="warning" ghost>Warning</v-button>
          <v-button type="error" ghost>Error</v-button>
        </div>
      </div>

      <div class="components-groups">
        <div>Quaternary</div>
        <div class="components-list">
          <v-button type="default" quaternary>Default</v-button>
          <v-button type="primary" quaternary>Primary</v-button>
          <v-button type="success" quaternary>Success</v-button>
          <v-button type="warning" quaternary>Warning</v-button>
          <v-button type="error" quaternary>Error</v-button>
        </div>
      </div>

      <div class="components-groups">
        <div>Disabled</div>
        <div class="components-list">
          <v-button type="default" disabled>Default</v-button>
          <v-button type="primary" disabled>Primary</v-button>
        </div>
      </div>

      <div class="components-groups">
        <div>Round and size</div>
        <div class="components-list">
          <v-button
            type="primary"
            size="small"
            round
          >small
          </v-button>
          <v-button
            type="primary"
            size="medium"
            >medium
          </v-button>
          <v-button
            type="primary"
            size="large"
            >large
          </v-button>
          <v-button
            type="primary"
            :size="4.5"
            >4.5 rem
          </v-button>
        </div>
      </div>

    </div>
    <div class="components-container">
      <h3>Inputs</h3>
      <div class="components-groups">
        <div>Form</div>
        <div class="components-inputs components-list">
          <v-input
            v-model:value="inputValue"
            placeholder="Введите текст"
            style-type="form"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import VButton from '@/components/kit/VButton.vue';
import VInput from '@/components/kit/VInput.vue';
import { ref } from 'vue';

const inputValue = ref('');
</script>

<style lang="scss" scoped>
.components-testing-container {
  width: 100%;
  height: 100%;
  padding: 5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .components-container {
    display: flex;
    flex-direction: column;
    gap: 20px;

    .components-groups {
      display: flex;
      flex-direction: column;
      gap: 10px;

      .components-list {
        display: flex;
        gap: 20px;
        flex-wrap: wrap;
      }

      .components-inputs {
        * {
          max-width: 300px;
        }
      }
    }
  }
}
</style>
