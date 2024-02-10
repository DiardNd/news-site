import { useAppSelector } from '../../../hooks';
import api from '../../../modules/axios';
import { PostsListResponse } from '../../../types';

export const fetchGetPosts = async (): Promise<PostsListResponse> => {
	const { data } = await api.get('posts');
	return data;
};
