import api from '../../../modules/axios';
import { CONTENT_TYPE } from '../../../utils/constants';
import { ResponseAuthBody } from '../auth/types';

export const userPatch = async (payload: FormData, id: number) => {
  const {
    data: { user }
  } = await api.patch<Pick<ResponseAuthBody, 'user'>>(`/users/${id}`, payload, {
    headers: CONTENT_TYPE,
    params: { id }
  });

  return user;
};
