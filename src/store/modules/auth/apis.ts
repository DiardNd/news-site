import api from '../../../modules/axios';
import { setToken } from '../../../utils/localStorage';

import { AuthData, ResponseAuthBody, User } from './types';

export const authFetch = async (payload: AuthData, path: string) => {
  const {
    data: { user, accessToken }
  } = await api.post<ResponseAuthBody>(path, payload);

  setToken(accessToken);

  return user;
};

export const whoAmI = async () => {
  const { data } = await api.get<Promise<User>>('/auth/whoami');

  return data;
};
