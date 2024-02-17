import { createSlice } from '@reduxjs/toolkit';
import { Post } from 'types/post';

import { User } from '../auth/types';

type UserState = {
	user: User | null;
	errorMessage: string | null;
	userPostList: Post[] | null;
	userPost: Post | null;
	selectedPost: Post | null;
	isLoading: boolean;
};
const initialState: UserState = {
  user: null,
  errorMessage: null,
  userPostList: null,
  selectedPost: null,
  isLoading: false,
  userPost: null
};
