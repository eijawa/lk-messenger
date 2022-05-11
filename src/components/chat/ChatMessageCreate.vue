<script lang="ts" setup>
import { NInput, InputProps } from 'naive-ui';

type InputThemeOverrides = NonNullable<InputProps['themeOverrides']>;

const inputThemeOverrides: InputThemeOverrides = {
  lineHeightTextarea: '1.3125',
  border: 'none',
  borderHover: 'none',
  borderFocus: 'none',
  boxShadowFocus: 'none',
  paddingMedium: '0 0',
};
</script>

<template>
  <div class="chat-message-create">
    <div class="chat-message-create-content">
      <div class="chat-message-compose">
        <div class="chat-message-input-wrapper">
          <n-input
            :autofocus="true"
            type="textarea"
            class="chat-message-input-text"
            :autosize="{ minRows: 1, maxRows: 18 }"
            placeholder="Message"
            :theme-overrides="inputThemeOverrides"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-message-create {
  position: relative;
  width: 100%;
  background-color: var(--color-background);

  @media (min-width: 927px) {
    border-radius: var(--border-radius-default);
    max-width: var(--messages-container-width);
  }

  .chat-message-create-content {
    .chat-message-compose {

      .chat-message-input-wrapper {
        .chat-message-input-text {
          width: 100%;
          background: unset;

          :deep(.n-input__textarea) {
            .n-input__textarea-el {
              padding: calc((3.5rem - var(--composer-text-size, 1rem)*1.3125)/2) 0;
            }

            .n-input__placeholder {
              padding: calc((3.5rem - var(--composer-text-size, 1rem)*1.3125)/2) 0;
            }

            .n-input__textarea-mirror {
              padding: calc((3.5rem - var(--composer-text-size, 1rem)*1.3125)/2) 0;
              transition: height 100ms ease;
            }
          }
        }
      }
    }
  }
}
</style>
