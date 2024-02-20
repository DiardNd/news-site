import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { fetchCreatedPost, fetchGetPosts } from './apis';

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  try {
    const { posts } = await fetchGetPosts();

    return posts;
  } catch (error) {
    if (error instanceof AxiosError) return error.message;
  }
});

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (payload: FormData) => {
    try {
      const post = await fetchCreatedPost(payload);

      return post;
    } catch (error) {
      if (error instanceof AxiosError) return error.message;
    }
  }
);
