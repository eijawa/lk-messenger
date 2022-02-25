import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useChatsStore = defineStore('chatsStore', () => {
  const chats = ref([
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid Momamed Big city life',
      'newMessagesCount': 0,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'attachment': {
          'type': 'pptx',
          'url': '',
        },
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
      'messages': [
        {
          'text': 'Hello there! whats up my little buddy, friend, comrad?',
          'from': {
            // User-data
          },
          'date': new Date(Date.now()).toISOString(),
          'isReaded': true,
        },
        {
          'text': 'Hello there! whats up my little buddy, friend, comrad?',
          'from': {
            // User-data
          },
          'date': new Date(Date.now()).toISOString(),
          'isReaded': true,
        },
      ],
    },
    {
      'avatarSrc': '',
      'title': 'Albert G',
      'newMessagesCount': 1,
      'lastMessage': {
        'text': 'Hello there!',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
    {
      'avatarSrc': '',
      'title': 'Mohammed Ali Gunnaid',
      'newMessagesCount': 3,
      'lastMessage': {
        'text': 'Hello there! whats up my little buddy, friend, comrad?',
        'from': {
          // User-data
        },
        'date': new Date(Date.now()).toISOString(),
        'isReaded': true,
      },
    },
  ]);

  return {
    chats,
  };
});
