import { ChatOrContact, SearchResponse } from '@/types/Search';

export const generateSearch = async (): Promise<SearchResponse> => {
  const { faker } = await import('@faker-js/faker');

  const generateChatOrContact = (isChat = false): ChatOrContact => ({
    id: faker.datatype.number({ max: 100000000 }),
    title: isChat ? faker.name.title() : faker.name.findName(),
    avatar: faker.image.avatar(),
    verified: faker.random.arrayElement([false, false, true]),
    label: isChat ? `${faker.datatype.number({ max: 1000000 })} subscribers`
      : `last seen ${faker.datatype.number({ max: 10 })} hour ago`,
  });

  const search: SearchResponse = {
    status: true,
    result: {
      chatsAndContacts: [],
    },
    errors: [],
  };

  Array.from({ length: faker.datatype.number({ max: 20 }) }).forEach(() => {
    search.result.chatsAndContacts.push(
      generateChatOrContact(faker.random.arrayElement([false, false, true])),
    );
  });

  return search;
};
