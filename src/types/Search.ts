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

export interface SearchResponse {
  status: boolean,
  result: Search,
}
