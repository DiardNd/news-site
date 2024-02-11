import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Post } from '../../../types/post';
import { getPosts } from './thunk';

type PostState = {
	postList: Post[];
	startCountPosts: number;
	endCountPosts: number;
	filterValue: string;
	searchText: string;
	isLoading: boolean;
	error: string | null;
};

const initialState: PostState = {
	postList: [],
	startCountPosts: 0,
	endCountPosts: 8,
	filterValue: '',
	searchText: '',
	isLoading: false,
	error: null,
};

const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		postsCounter(state, action: PayloadAction<{ startCountPosts: number }>) {
			state.startCountPosts = action.payload.startCountPosts;
			state.endCountPosts = state.startCountPosts + 8;
		},
		setFilterValue(state, action: PayloadAction<{ filterValue: string }>) {
			state.filterValue = action.payload.filterValue;
		},
		setSearchText(state, action: PayloadAction<string>) {
			state.searchText = action.payload;
		},
	},

	extraReducers: builder => {
		builder
			.addCase(getPosts.pending, state => {
				state.isLoading = true;
				state.error = null;
			})
			.addCase(getPosts.fulfilled, (state, action) => {
				state.isLoading = false;
				if (typeof action.payload === 'string') {
					state.error = action.payload;
				}
				if (Array.isArray(action.payload)) {
					state.postList = action.payload;
					state.error = null;
				}
			})
			.addCase(getPosts.rejected, (state, action) => {
				state.isLoading = false;
				if (typeof action.payload === 'string') {
					state.error = action.payload;
				}
			});
	},
});

export const { postsCounter, setFilterValue, setSearchText, setPostList } = postSlice.actions;

export default postSlice.reducer;
