import { useFetch } from '@/hooks/useService';
import config from '@/config';

interface ChatOrContact {
  id: number,
  username: string,
  avatar: string | undefined,
  verified: boolean,
  label: string,
}

interface Search {
  ChatsAndContacts: Array<ChatOrContact>,
}

export class SearchService {
  messengerSearch = async (query: string): Promise<Search> => {
    const url = new URL(`${config.baseUrl}/find`);
    url.search = new URLSearchParams({ text: query }).toString();

    const response = await useFetch<Search>(url.toString(), {
      method: 'GET',
    });

    return response;
  };
}
