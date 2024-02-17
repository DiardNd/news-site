import { PostsListResponse } from '../../../types/post';
import api from '../../../modules/axios';

export const fetchGetPosts = async (): Promise<PostsListResponse> => {
  const { data } = await api.get('posts');
  return data;
};
