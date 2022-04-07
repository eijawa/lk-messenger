<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { VMessengerListItemType } from '@/types/VMessengerListItemType';
import { useGetCSSVariable } from '@/hooks/useCssVariables';

import VAvatar from '@/components/kit/VAvatar.vue';
import VIcon from '@/components/kit/VIcon.vue';
import VerifiedIcon from '@/assets/icons/verified.svg';
import MuteIcon from '@/assets/icons/mute.svg';
import MessageSendIcon from '@/assets/icons/message-out-going-send.svg';
import MessageReadIcon from '@/assets/icons/message-out-going-read.svg';
import PinnedBadgeIcon from '@/assets/icons/fixing-badge.svg';

const props = defineProps({
  item: {
    type: Object as PropType<VMessengerListItemType>,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});

const itemValue = computed<VMessengerListItemType>(() => props.item);

const primaryColor = useGetCSSVariable('--color-primary');
const fixingBadgeIconFillColor = useGetCSSVariable('--color-pinned');
</script>

<template>
  <div class="chats-list-items">
    <div class="chats-list-items-content">
      <v-avatar
        :title="itemValue.conversation.info.title"
        :src="itemValue.conversation.info.avatar"
      />
      <div class="info">
        <div class="info-top">
          <div class="main-info">
            <div class="title">
              {{ itemValue.conversation.info.title }}
            </div>
            <div v-if="itemValue.conversation.info.verified" class="mute">
              <v-icon
                :src="VerifiedIcon"
                :size="16"
                name="verified"
              />
            </div>
            <div v-if="itemValue.conversation.pushSettings.mute" class="verified">
              <v-icon
                :src="MuteIcon"
                :fill="fixingBadgeIconFillColor"
                :size="16"
                name="mute"
              />
            </div>
          </div>
          <div class="last-message-info">
            <div v-if="itemValue.conversation.markedUnRead !== undefined" class="message-out-going">
              <v-icon
                v-if="!itemValue.conversation.markedUnRead"
                :src="MessageSendIcon"
                :fill="primaryColor"
                :size="20"
                name="message-out-going-send"
              />
              <v-icon
                v-else
                :src="MessageReadIcon"
                :fill="primaryColor"
                :size="20"
                name="message-out-going-read"
              />
            </div>
            <div v-if="typeof itemValue.lastMessage !== 'undefined'" class="time">
              Fri
            </div>
          </div>
        </div>
        <div class="info-bottom">
          <div class="last-message">
            <template v-if="itemValue.conversation.peer.type === 'chat'">
              <span class="sender-name">{{ itemValue.lastMessage.from.username }}</span>
              <span class="colon">:</span>
            </template>
            <template v-if="typeof itemValue.lastMessage !== 'undefined'">
              {{ itemValue.lastMessage.text }}
            </template>
            <template v-else>
              {{ itemValue.label }}
            </template>
          </div>
          <div v-if="itemValue.conversation.unReadCount !== 0" class="count-message-badge">
            <div class="count-message-badge-content">
              {{ itemValue.conversation.unReadCount }}
            </div>
          </div>
          <div
            v-if="itemValue.conversation.unReadCount === 0 &&
              itemValue.conversation.pinned"
            class="pinned-badge"
          >
            <v-icon
              :src="PinnedBadgeIcon"
              :fill="fixingBadgeIconFillColor"
              :size="16"
              name="fixing-badge"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chats-list-items {
  width: 100%;
  padding: 0.5rem;
  cursor: pointer;
  user-select: none;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  outline: none;
  border-radius: var(--border-radius-default);

  @media (min-width: 927px) {
    &:hover {
      background-color: var(--color-chat-hover);
    }
  }

  .chats-list-items-content {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    overflow: hidden;

    .info {
      width: 100%;
      flex-grow: 1;
      overflow: hidden;

      .info-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.5rem;
        overflow: hidden;

        .main-info {
          display: flex;
          align-items: center;
          overflow: hidden;
          gap: 0.25rem;

          .title {
            color: var(--color-text);
            width: auto;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-weight: 500;
          }

          .verified {
            display: flex;
            align-items: center;
            justify-content: center
          }

          .mute {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        .last-message-info {
          display: flex;
          gap: 0.125rem;
          align-items: center;
          color: var(--color-text-meta);
          font-size: .75rem;

          .message-out-going {
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .time {
            line-height: 1.125rem;
          }
        }
      }

      .info-bottom {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .last-message {
          flex-grow: 1;
          color: var(--color-text-secondary);
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          .sender-name {
            color: var(--color-text);
          }
        }

        .count-message-badge {
          transition: transform .3s cubic-bezier(0.34, 1.56, 0.64, 1);

          .count-message-badge-content {
            min-width: 1.5rem;
            height: 1.5rem;
            background: var(--color-gray);
            border-radius: 0.75rem;
            padding: 0 0.4375rem;
            color: #fff;
            font-size: .875rem;
            line-height: 1.5625rem;
            font-weight: 500;
            text-align: center;
            flex-shrink: 0;
          }
        }

        .pinned-badge {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
