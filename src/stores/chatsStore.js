import { defineStore } from 'pinia';
import { ref } from 'vue';

import { generateChat } from '@/services/mocks/chatsMock';

import { useUserStore } from '@/stores/userStore';

import config from '@/config';

import { ChatsService } from '@/services/ChatsService';

const chatsService = new ChatsService();

export const useChatsStore = defineStore('chatsStore', {
  state: () => {
    const chats = ref([]);

    return {
      chats,
    };
  },
  actions: {
    async getChats() {
      if (!config.isUseMockedData) {
        const chatsData = await chatsService.getChats();
        this.chats = chatsData.result;
      } else {
        const userStore = useUserStore();
        const arrayLoops = Array.from({ length: 20 }, (v, k) => k);
        await arrayLoops.forEach(async item => {
          const chat = await generateChat(item, userStore);
          this.chats.push(chat);
        });
      }
    },
  },
  getters: {
    getChatById: state => chatId => state.chats.find(c => c.id === chatId),
  },
});
