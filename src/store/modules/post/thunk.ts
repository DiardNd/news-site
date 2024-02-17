import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { fetchGetPosts } from './apis';

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
  try {
    const { posts } = await fetchGetPosts();

    return posts;
  } catch (error) {
    if (error instanceof AxiosError) return error.message;
  }
});
