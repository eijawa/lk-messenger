import { useFetch } from '@/helpers/serviceHelper';
import config from '@/config';

export class UserService {
  getUserInfo = async () => {
    const url = new URL(`${config.baseUrl}/user-info`);

    const response = await useFetch(url, {
      method: 'GET',
    });

    return response;
  };
}
