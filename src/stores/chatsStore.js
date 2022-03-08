import { defineStore } from 'pinia';
import { ref } from 'vue';

import config from '@/config';

import { faker } from '@faker-js/faker';

import { ChatsService } from '@/services/ChatsService';

const chatsService = new ChatsService();

const generateUser = () => ({
  id: faker.datatype.uuid(),
  avatarSrc: faker.image.avatar(),
  username: faker.name.firstName(),
  university: faker.random.arrayElement(['eaf', 'pt', 'pht', 'ns', 'pac', 'wwe', 'care', 'hwwcast', 'mait', 'r']),
});

const generateMessage = (ownerId, potentialReaders) => {
  const messageContentText = faker.lorem.lines();
  const potentialReadersId = [...potentialReaders].map(r => r.id);
  const messageType = faker.random.arrayElement(['default', 'reply']);

  return {
    id: faker.datatype.uuid(),
    type: messageType,
    content: {
      text: messageContentText,
    },
    date: String(faker.date.recent(10)),
    owner: {
      id: ownerId,
    },
    readBy: faker.random.arrayElements(potentialReadersId),
  };
};

const generateChat = index => {
  const chatType = faker.random.arrayElement(['dialog', 'group']);

  let chatMembers = [];
  if (chatType === 'dialog') {
    chatMembers.push(generateUser());
  } else {
    const chatMembersCount = faker.datatype.number({ min: 1, max: 10 });
    chatMembers = Array.from({ length: chatMembersCount }, () => generateUser());
  }

  const chatTitle = chatType === 'tat' ? chatMembers[0].username : faker.name.title();

  const chatLastMessageOwner = faker.random.arrayElement(chatMembers);
  const chatLastMessage = generateMessage(chatLastMessageOwner.id, chatMembers);

  return {
    id: String(index),
    avatarSrc: faker.image.avatar(),
    title: chatTitle,
    type: chatType,
    members: chatMembers,
    lastMessage: chatLastMessage,
    newMessagesCount: faker.datatype.number(24),
  };
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
        this.chats = Array.from({ length: 12 }, (_, idx) => generateChat(idx));
      }
    },
  },
  getters: {
    getChatById: state => chatId => state.chats.find(c => c.id === chatId),
  },
});
