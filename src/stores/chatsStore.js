import { defineStore } from 'pinia';
import { ref } from 'vue';

import { useUserStore } from '@/stores/userStore';

import config from '@/config';

import { faker } from '@faker-js/faker';

import { ChatsService } from '@/services/ChatsService';

const chatsService = new ChatsService();

const generateUser = (avatar = faker.image.avatar()) => ({
  id: faker.datatype.number({ max: 100000000 }),
  avatarSrc: avatar,
  username: faker.name.findName(),
});

const generateMessage = (messageFrom, userId) => {
  const messageContentText = faker.lorem.lines();

  const message = {
    conversationMessageId: faker.datatype.number({ max: 100000 }),
    date: String(faker.date.recent(10)),
    from: messageFrom,
    text: messageContentText,
  };

  if (messageFrom.id === userId) {
    message.isRead = faker.random.arrayElement([true, false]);
  }

  return message;
};

const generateChat = (index, userStore) => {
  const chatType = faker.random.arrayElement(['dialog', 'chat']);
  let avatar = null;

  let chatMembers = [];
  if (chatType === 'dialog') {
    avatar = faker.random.arrayElement([faker.image.avatar(), faker.image.avatar(), null]);
    chatMembers.push(generateUser(avatar));
  } else {
    avatar = faker.random.arrayElement([faker.image.business(128, 128, true), null]);

    const chatMembersCount = faker.datatype.number({ min: 1, max: 3 });
    chatMembers = Array.from({ length: chatMembersCount }, () => generateUser());
  }

  const chatTitle = chatType === 'dialog' ? chatMembers[0].username : faker.name.title();

  const chatLastMessageFrom = faker.random.arrayElement([faker.random.arrayElement(chatMembers), userStore.user]);

  const chatLastMessage = generateMessage(chatLastMessageFrom, userStore.user.id);

  const chat = {
    conversation: {
      id: String(index),
      avatarSrc: avatar,
      title: chatTitle,
      type: chatType,
      isMuted: faker.random.arrayElement([false, false, true]),
      isVerified: faker.random.arrayElement([false, false, true]),
      isPinned: faker.random.arrayElement([false, false, true]),
    },
    lastMessage: chatLastMessage,
  };

  if (chatLastMessageFrom.id !== userStore.user.id) {
    chat.conversation.unReadCount = faker.datatype.number(24);
  }

  return chat;
};

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
        this.chats = Array.from({ length: 14 }, (_, idx) => generateChat(idx, userStore));
      }
    },
  },
  getters: {
    getChatById: state => chatId => state.chats.find(c => c.id === chatId),
  },
});
