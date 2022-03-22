import { useFetch } from '@/use/useService';
import config from '@/config';

export interface User {
  id: number,
  username: string,
  avatar: string | undefined,
  verified: boolean,
}

export class UserService {
  getUserInfo = async (): Promise<User> => {
    const url = `${config.baseUrl}/user-info`;

    const response = await useFetch<User>(url, {
      method: 'GET',
    });

    return response;
  };
}
