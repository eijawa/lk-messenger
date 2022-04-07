import { useFetch } from '@/hooks/useService';
import config from '@/config';
import { User } from '@/services/UserService';

export interface Message {
  conversationMessageId: number,
  date: string,
  from: User,
  text: string,
}

export type ConversationType = 'user' | 'chat';

export interface ConversationPeer {
  id: number,
  type: ConversationType,
}

export interface ConversationInfo {
  title: string,
  avatar: string | undefined,
  verified: boolean,
}

export interface PushSettings {
  disabledForever?: boolean,
  disabledUntil?: number,
  mute: boolean,
}

export interface Conversation {
  peer: ConversationPeer,
  info: ConversationInfo,
  unReadCount: number,
  markedUnRead?: boolean,
  pinned: boolean,
  pushSettings: PushSettings,
}

export interface Chat {
  conversation: Conversation,
  lastMessage: Message,
}

export type Chats = Array<Chat>;

export class ChatsService {
  getChats = async (): Promise<Chats> => {
    const url = `${config.baseUrl}/get-chats`;

    const response = await useFetch<Chats>(url, {
      method: 'GET',
    });

    return response;
  };
}
