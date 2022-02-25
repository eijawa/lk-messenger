import { useFetch } from '@/helpers/serviceHelper';

export class SearchService {
  globalSearch = async () => {
    const response = await useFetch('https://dev.lk.fokin-team.ru:2060/user-info');
    return response;
  };
}
