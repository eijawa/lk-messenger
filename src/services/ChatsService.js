import { useFetch } from '@/helpers/serviceHelper';
import config from '@/config';

export class ChatsService {
  getChats = async () => {
    const url = new URL(`${config.baseUrl}/get-chats`);

    const response = await useFetch(url, {
      method: 'GET',
    });

    return response;
  };
}
