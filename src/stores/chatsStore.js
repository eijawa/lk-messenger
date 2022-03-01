import { defineStore } from 'pinia';
import { ref } from 'vue';

import config from '@/config';

import { faker } from '@faker-js/faker';

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
    async fetchUserChats() {
      if (!config.isUseMockedData) {
        const chatsData = await chatsService.getChats();
        this.chats = chatsData.result;
      } else {
        // eslint-disable-next-line arrow-body-style
        const generateAvatar = () => {
          return faker.random.arrayElement([faker.image.avatar(), '']);
        };

        // eslint-disable-next-line arrow-body-style
        const generateUser = (index, avatar) => {
          return {
            id: String(index),
            avatarSrc: avatar,
            username: faker.name.firstName(),
            university: faker.random.arrayElement(['eaf', 'pt', 'pht', 'ns', 'pac', 'wwe', 'care', 'hwwcast', 'mait', 'r']),
            type: faker.random.arrayElement(['student', 'teacher']),
          };
        };

        // eslint-disable-next-line arrow-body-style
        this.chats = Array.from({ length: 12 }, (el, idx) => {
          const chatType = faker.random.arrayElement(['tat', 'group']);
          let chatAvatar;

          let chatMembers = [];
          if (chatType === 'tat') {
            chatAvatar = generateAvatar();

            chatMembers.push(generateUser(idx, chatAvatar));
          } else {
            chatAvatar = '';

            const chatMembersCount = faker.datatype.number({ min: 1, max: 8 });

            // eslint-disable-next-line arrow-body-style
            chatMembers = Array.from({ length: chatMembersCount }, (elem, jdx) => generateUser(jdx, generateAvatar()));
          }

          const chatTitle = chatType === 'tat' ? chatMembers[0].username : faker.name.title();

          return {
            id: String(idx),
            avatarSrc: chatAvatar,
            title: chatTitle,
            type: chatType,
            members: chatMembers,
          };
        });
      }
    },
  },
  getters: {
    getChatById: state => chatId => state.chats.find(c => c.id === chatId),
  },
});
