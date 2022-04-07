<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { useRouter } from 'vue-router';
import { useChatsStore } from '@/stores/chatsStore';
import { Search } from '@/types/Search';
import { VMessengerListItemsType, VMessengerListItemType } from '@/types/VMessengerListItemType';
import VButton from '@/components/kit/VButton.vue';
import VMessengerListItem from '@/components/kit/VMessengerListItem.vue';

const router = useRouter();
const chatsStore = useChatsStore();

const props = defineProps({
  search: {
    type: Object as PropType<Search>,
    required: true,
  },
});

// Чаты и беседы
const usersOrChats = computed<VMessengerListItemsType>(() => props?.search?.chatsAndContacts
  .map(item => ({
    conversation: {
      peer: {
        id: item.id,
        type: 'user',
      },
      info: {
        title: item.title,
        avatar: item.avatar,
        verified: item.verified,
      },
      unReadCount: 0,
      pinned: false,
      pushSettings: {
        disabledForever: false,
        mute: false,
      },
    },
    label: item.label,
  })) as VMessengerListItemsType ?? []);

const chatOrContactClickHandler = async (userOrChat: VMessengerListItemType) => {
  await router.push({ name: 'chat', params: { id: userOrChat.conversation.peer.id } });
};
</script>

<template>
  <div class="messenger-search">
    <div class="search-header">
      <div class="search-header-title">
        Chats and Contacts
      </div>
<!--      <v-button type="primary" text>-->
<!--        Show more-->
<!--      </v-button>-->
    </div>
    <div class="search-body">
      <v-messenger-list-item
        v-for="userOrChat in usersOrChats"
        :key="userOrChat.conversation.peer.id"
        :item="userOrChat"
        @click="chatOrContactClickHandler(userOrChat)"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.messenger-search {
  overflow: hidden;
  height: 100%;
  width: 100%;
  padding: 0.5rem 0.5rem 0 0.5rem;

  .search-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .search-header-title {
      color: var(--color-text-secondary);
      font-weight: 500;
    }
  }
}
</style>
