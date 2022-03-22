import { useFetch } from '@/use/useService';
import config from '@/config';

export class SearchService {
  messengerSearch = async (query: string) => {
    const url = new URL(`${config.baseUrl}/find`);
    url.search = new URLSearchParams({ text: query }).toString();

    const response = await useFetch(url.toString(), {
      method: 'GET',
    });

    return response;
  };
}
