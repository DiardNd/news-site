import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchGetPosts } from './apis';
import { AxiosError } from 'axios';

export const getPosts = createAsyncThunk('posts/getPosts', async () => {
	try {
		const { posts } = await fetchGetPosts();

		return posts;
	} catch (error) {
		if (error instanceof AxiosError) return error.message;
	}
});
