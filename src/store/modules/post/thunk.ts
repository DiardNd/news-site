import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { FormDataPayload } from '../user/types';

import {
  deletePost, editPost, fetchCreatedPost, fetchGetPosts
} from './apis';

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

export const deletePostById = createAsyncThunk(
  'posts/deletePostById',
  async (postId: number) => {
    try {
      await deletePost(postId);
    } catch (error) {
      if (error instanceof AxiosError) return error.message;
    }
  }
);

export const editPostById = createAsyncThunk(
  'posts/editPostById',
  async ({ id, payload }: FormDataPayload) => {
    try {
      await editPost(id, payload);
    } catch (error) {
      if (error instanceof AxiosError) return error.message;
    }
  }
);
