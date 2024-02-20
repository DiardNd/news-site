import { Post, PostsListResponse } from '../../../types/post';
import { CONTENT_TYPE } from '../../../utils/constants';
import api from '../../../modules/axios';

export const fetchGetPosts = async () => {
  const { data } = await api.get<PostsListResponse>('posts');
  return data;
};

export const fetchCreatedPost = async (payload: FormData) => {
  const { data } = await api.post<Post>('posts', payload, { headers: CONTENT_TYPE });

  return data;
};
