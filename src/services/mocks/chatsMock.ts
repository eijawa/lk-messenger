import { User } from '@/services/UserService';
import {
  Chat, Conversation, ConversationType, Message,
} from '@/services/ChatsService';

export const generateChat = async (index: number, currentUser: User): Promise<Chat> => {
  const { faker } = await import('@faker-js/faker');

  const generateUser = (avatar = faker.image.avatar()): User => ({
    id: faker.datatype.number({ max: 100000000 }),
    username: faker.name.findName(),
    avatar,
    verified: faker.random.arrayElement([false, false, true]),
  });

  const generateMessage = (messageFrom: User): Message => ({
    conversationMessageId: faker.datatype.number({ max: 100000 }),
    date: String(faker.date.recent(10)),
    from: messageFrom,
    text: faker.lorem.lines(),
  });

  const chatType: ConversationType = faker.random.arrayElement(['user', 'chat']);

  const user = generateUser(faker.random.arrayElement([faker.image.avatar(), undefined]));

  const title = chatType === 'user' ? faker.name.findName() : faker.name.title();

  const avatar = chatType === 'user' ? faker.random.arrayElement([faker.image.avatar(), undefined])
    : faker.random.arrayElement([faker.image.business(128, 128, true), undefined]);

  const mute = faker.random.arrayElement([false, false, true]);

  const chatLastMessageFrom = faker.random.arrayElement([user, currentUser]);

  const conversation: Conversation = {
    peer: {
      id: faker.datatype.number({ max: 100000 }),
      type: chatType,
    },
    info: {
      avatar,
      title,
    },
    unReadCount: 0,
    pinned: faker.random.arrayElement([false, false, true]),
    pushSettings: {
      disabledForever: mute,
      mute,
    },
  };

  if (chatLastMessageFrom.id !== currentUser.id) {
    conversation.unReadCount = faker.random.arrayElement([0, faker.datatype.number(24)]);
  } else {
    conversation.markedUnRead = faker.random.arrayElement([false, false, true]);
  }

  const lastMessage: Message = generateMessage(chatLastMessageFrom);

  return {
    conversation,
    lastMessage,
  };
};
