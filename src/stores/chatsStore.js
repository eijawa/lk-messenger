import { defineStore } from 'pinia';
import { ref } from 'vue';

import config from '@/config';

import { faker } from '@faker-js/faker';

import { ChatsService } from '@/services/ChatsService';

const chatsService = new ChatsService();

// eslint-disable-next-line arrow-body-style
const generateAvatar = () => {
  return faker.random.arrayElement([faker.image.avatar(), '']);
};

// eslint-disable-next-line arrow-body-style
const generateUser = avatar => {
  return {
    id: faker.datatype.uuid(),
    avatarSrc: avatar,
    username: faker.name.firstName(),
    university: faker.random.arrayElement(['eaf', 'pt', 'pht', 'ns', 'pac', 'wwe', 'care', 'hwwcast', 'mait', 'r']),
    type: faker.random.arrayElement(['student', 'teacher']),
  };
};

// eslint-disable-next-line arrow-body-style
const generateMessage = (ownerId, potentialReaders) => {
  const messageContentType = faker.random.arrayElement(['file', 'image', 'text']);
  let messageContentValue;
  switch (messageContentType) {
  case 'file':
    // eslint-disable-next-line prefer-template
    messageContentValue = faker.system.filePath() + '.' + faker.random.arrayElement(['doc', 'ppt', 'xls', 'zip', 'ext']);
    break;
  case 'image':
    // eslint-disable-next-line prefer-template
    messageContentValue = faker.image.abstract() + '.' + faker.random.arrayElement(['png', 'jpeg', 'jpg', 'webp', 'tiff', 'ico', 'gif', 'bmp']);
    break;
  case 'text':
    messageContentValue = faker.lorem.lines();
    break;
  default: break;
  };

  const potentialReadersId = [...potentialReaders].map(r => r.id);

  const messageType = faker.random.arrayElement(['default', 'reply']);

  return {
    id: faker.datatype.uuid(),
    content: {
      value: messageContentValue,
      type: messageContentType,
    },
    date: String(faker.date.recent(10)),
    owner: {
      id: ownerId,
    },
    readedBy: faker.random.arrayElements(potentialReadersId),
    type: messageType,
  };
};

const generateChat = (index, messengerSettingsStore) => {
  const chatType = faker.random.arrayElement(['tat', 'group']);
  let chatAvatar;

  let chatMembers = [];
  if (chatType === 'tat') {
    chatAvatar = generateAvatar();

    chatMembers.push(generateUser(chatAvatar));
  } else {
    chatAvatar = '';

    const chatMembersCount = faker.datatype.number({ min: 1, max: 8 });

    // eslint-disable-next-line arrow-body-style
    chatMembers = Array.from({ length: chatMembersCount }, () => generateUser(generateAvatar()));
  }

  const chatTitle = chatType === 'tat' ? chatMembers[0].username : faker.name.title();

  let chatLastMessageOwner;
  if (chatType === 'tat') {
    chatLastMessageOwner = faker.random.arrayElement([messengerSettingsStore.user, chatMembers[0]]);
  } else {
    chatLastMessageOwner = faker.random.arrayElement([messengerSettingsStore.user, ...chatMembers]);
  }
  const chatLastMessage = generateMessage(chatLastMessageOwner.id, chatMembers);

  return {
    id: String(index),
    avatarSrc: chatAvatar,
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
    async fetchUserChats() {
      if (!config.isUseMockedData) {
        const chatsData = await chatsService.getChats();
        this.chats = chatsData.result;
      } else {
        const { useMessengerSettingsStore } = await import('@/stores/messengerSettingsStore');
        const messengerSettingsStore = useMessengerSettingsStore();
        // eslint-disable-next-line arrow-body-style
        this.chats = Array.from({ length: 12 }, (_, idx) => generateChat(idx, messengerSettingsStore));
      }
    },
  },
  getters: {
    getChatById: state => chatId => state.chats.find(c => c.id === chatId),
  },
});
