import { ResponseBase } from '@/types/ResponseBase';

export interface ChatOrContact {
  id: number,
  title: string,
  avatar: string | undefined,
  verified: boolean,
  label: string,
}

export interface Search {
  chatsAndContacts: Array<ChatOrContact>,
}

export interface SearchResponse extends ResponseBase {
  result: Search,
}
