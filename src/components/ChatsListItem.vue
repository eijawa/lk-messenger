<template>
  <div class="chats-list-items">
    <div class="chats-list-items-content">
      <v-avatar title="Максим" />
      <div class="info">
        <div class="info-top">
          <div class="main-info">
            <div class="title">Максим Мостовой</div>
            <div class="verified">
              <v-icon
                :src="VerifiedIcon"
                :size="16"
                name="fixing-badge"
              />
            </div>
            <div class="mute">
              <v-icon
                :src="MuteIcon"
                :fill="fixingBadgeIconFillColor"
                :size="16"
                name="fixing-badge"
              />
            </div>
          </div>
          <div class="last-message-info">
            <div class="message-out-going">
              <v-icon
                v-if="true"
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
            <span class="sender-name">Женя</span>
            <span class="colon">:</span>
            ну да. и что ты сделаешь впрврврврврвр?
          </div>
          <div v-if="false" class="count-message-badge">
            <div class="count-message-badge-content">24</div>
          </div>
          <div v-else class="fixing-badge">
            <v-icon
              :src="FixingBadgeIcon"
              :fill="fixingBadgeIconFillColor"
              :size="16"
              name="fixing-badge"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  <chat-card-->
  <!--    :avatar-src="chat.avatarSrc"-->
  <!--    :title="chat.title"-->
  <!--    :chat-type="chat.type"-->
  <!--    :is-active="isOpened"-->
  <!--    @click="onClickHandler"-->
  <!--  >-->

  <!--    <template #meta>-->
  <!--      <labels-group>-->
  <!--        <readed-label v-if="isYourMessageReaded"></readed-label>-->
  <!--        <date-label :date="chat.lastMessage?.date"></date-label>-->
  <!--      </labels-group>-->
  <!--    </template>-->

  <!--    <template #prefix>-->
  <!--      <attachment-->
  <!--        v-if="chat.lastMessage?.content.type != 'text'"-->
  <!--        :attachment-src="chat.lastMessage?.content.value"-->
  <!--        is-minified-->
  <!--      />-->
  <!--    </template>-->

  <!--    <template #text>-->
  <!--      <span v-if="chat.lastMessage?.content.type === 'text'">{{ chat.lastMessage?.content.value }}</span>-->
  <!--      <span v-else-if="chat.lastMessage?.content.type === 'image'">Изображение</span>-->
  <!--      <span v-else>{{ atta.fileName }}</span>-->
  <!--    </template>-->

  <!--    <template #suffix>-->
  <!--      <a-tag v-if="chat.newMessagesCount != 0" class="chat__count">{{ chat.newMessagesCount }}</a-tag>-->
  <!--    </template>-->
  <!--  </chat-card>-->
</template>

<script setup>
import { computed } from 'vue';

import VAvatar from '@/components/kit/VAvatar.vue';
import VIcon from '@/components/kit/VIcon.vue';
import VerifiedIcon from '@/assets/icons/verified.svg';
import MuteIcon from '@/assets/icons/mute.svg';
import MessageSendIcon from '@/assets/icons/message-out-going-send.svg';
import MessageReadIcon from '@/assets/icons/message-out-going-read.svg';
import FixingBadgeIcon from '@/assets/icons/fixing-badge.svg';
import { getCSSVariable } from '@/helpers/cssVariablesHelper';

import LabelsGroup from '@/components/kit/Labels/LabelsGroup.vue';
import Attachment from '@/components/kit/Labels/Attachment.vue';
import ReadedLabel from '@/components/kit/Labels/ReadedLabel.vue';
import DateLabel from '@/components/kit/Labels/DateLabel.vue';
import ChatCard from '@/components/kit/Cards/ChatCard.vue';

import { getAttachmentInfo } from '@/helpers/attachmentHelper';

const props = defineProps({
  chat: {
    type: Object,
    required: true,
    default: () => {
    },
  },
  isOpened: {
    type: Boolean,
    default: false,
  },
});

const primaryColor = getCSSVariable('--color-primary');
const fixingBadgeIconFillColor = getCSSVariable('--color-pinned');

const emits = defineEmits(['open']);

const isYourMessageReaded = computed(() => true);

const atta = computed(() => '');

const onClickHandler = () => {
  emits('open', props.chat.id);
};
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

  @media (max-width: 927px) {
    padding: 0.5rem 0.5rem 0.5rem 0;
  }

  &:hover {
    background-color: var(--color-chat-hover);
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

        .main-info {
          display: flex;
          align-items: center;
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

        .fixing-badge {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
