import api from '../../../modules/axios';
import { CONTENT_TYPE } from '../../../utils/constants';
import { User } from '../auth/types';

import { UserRequest } from './types';

export const userPatch = async (payload: UserRequest, id: number): Promise<User> => {
	const {
		data: { user },
	} = await api.patch(`/users/${id}`, payload, {
		headers: CONTENT_TYPE,
		params: { id },
	});

	return user;
};
