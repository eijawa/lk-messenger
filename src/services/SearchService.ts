import { useFetch } from '@/hooks/useService';
import config from '@/config';
import { generateSearch } from '@/services/mocks/searchMock';
import { SearchResponse } from '@/types/Search';

export class SearchService {
  messengerSearch = async (query: string): Promise<SearchResponse> => {
    if (config.isUseMockedData) {
      const response = await generateSearch();
      return response;
    }

    const url = new URL(`${config.baseUrl}/find`);
    url.search = new URLSearchParams({ text: query }).toString();

    const response = await useFetch<SearchResponse>(url.toString(), {
      method: 'GET',
    });

    return response;
  };
}
