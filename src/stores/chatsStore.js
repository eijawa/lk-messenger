import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatsStore = defineStore('chatsStore', {
  state: () => {
    const chats = ref([]);

    const searchedUsers = ref([]);
    const searchedChats = ref([]);
    const searchedMessages = ref([]);

    return {
      chats,
      searchedUsers,
      searchedChats,
      searchedMessages,
    };
  },
  getters: {
    getChatById: state => chatId => state.chats.find((c) => c.id === chatId),
  },
});
