import { useFetch } from '@/helpers/serviceHelper';
import config from '@/config';

export class SearchService {
  messengerSearch = async query => {
    const url = new URL(`${config.baseUrl}/find`);
    url.search = new URLSearchParams({ text: query }).toString();
    console.log(url);
    const response = await useFetch(url, {
      method: 'GET',
    });
    return response;
  };
}
