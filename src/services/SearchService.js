import { useFetch } from '../helpers/serviceHelper';

export class SearchService {
    globalSearch = async () => {
        const response = await useFetch('https://dev.lk.fokin-team.ru/api/find-users-by-username?username=Фокин');
        return response;
    };
}
