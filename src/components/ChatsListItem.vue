<template>
  <div class="chats-list-items">
    <div class="chats-list-items-content">
      <v-avatar title="Максим" :src="props.chat.conversation.avatarSrc" />
      <div class="info">
        <div class="info-top">
          <div class="main-info">
            <div class="title">{{ props.chat.conversation.title }}</div>
            <div v-if="props.chat.conversation.isMuted" class="verified">
              <v-icon
                :src="VerifiedIcon"
                :size="16"
                name="fixing-badge"
              />
            </div>
            <div v-if="props.chat.conversation.isVerified" class="mute">
              <v-icon
                :src="MuteIcon"
                :fill="fixingBadgeIconFillColor"
                :size="16"
                name="fixing-badge"
              />
            </div>
          </div>
          <div class="last-message-info">
            <div v-if="props.chat.lastMessage?.isRead !== undefined" class="message-out-going">
              <v-icon
                v-if="!props.chat.lastMessage?.isRead"
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
            <div class="time">Fri</div>
          </div>
        </div>
        <div class="info-bottom">
          <div class="last-message">
            <span v-if="props.chat.conversation.type === 'chat'" class="sender-name">{{ props.chat.lastMessage.from.username }}</span>
            <span v-if="props.chat.conversation.type === 'chat'" class="colon">:</span>
            {{ props.chat.lastMessage.text }}
          </div>
          <div v-if="props.chat.conversation?.unReadCount" class="count-message-badge">
            <div class="count-message-badge-content">{{ props.chat.conversation?.unReadCount }}</div>
          </div>
          <div v-if="!props.chat.conversation?.unReadCount && props.chat.conversation.isPinned" class="pinned-badge">
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

<script setup>
import VAvatar from '@/components/kit/VAvatar.vue';
import VIcon from '@/components/kit/VIcon.vue';
import VerifiedIcon from '@/assets/icons/verified.svg';
import MuteIcon from '@/assets/icons/mute.svg';
import MessageSendIcon from '@/assets/icons/message-out-going-send.svg';
import MessageReadIcon from '@/assets/icons/message-out-going-read.svg';
import PinnedBadgeIcon from '@/assets/icons/fixing-badge.svg';
import { getCSSVariable } from '@/helpers/cssVariablesHelper';

const props = defineProps({
  chat: {
    type: Object,
    required: true,
  },
  isSelected: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(['open']);

const onClickHandler = () => {
  emits('open', props.chat.id);
};

const primaryColor = getCSSVariable('--color-primary');
const fixingBadgeIconFillColor = getCSSVariable('--color-pinned');
</script>

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
