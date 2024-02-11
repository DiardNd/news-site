import { createSlice } from '@reduxjs/toolkit';

import { AuthState } from './types';
import { authUser } from './thunk';

import { removeToken } from '../../../utils/localStorage';

const initialState: AuthState = {
	isLoading: false,
	authUser: null,
	isLoggedIn: false,
	errorMessage: '',
	path: '',
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logOutUser(state) {
			state.isLoggedIn = false;
			state.authUser = null;

			removeToken();
		},
	},
	extraReducers: builder => {
		builder
			.addCase(authUser.fulfilled, (state, action) => {
				state.authUser = action.payload;
				if (typeof action.payload === 'object') {
					state.isLoggedIn = true;
					state.errorMessage = '';
				}
				if (typeof action.payload === 'string') {
					state.isLoggedIn = false;
					state.errorMessage = action.payload;
				}
			})
			.addCase(authUser.pending, state => {
				state.isLoading = true;
				state.isLoggedIn = false;
				state.errorMessage = '';
			})
			.addCase(authUser.rejected, (state, action) => {
				state.isLoggedIn = false;
				state.isLoading = false;
				state.errorMessage = action.error.message || 'An error occurred';
			});
	},
});

export const { logOutUser } = authSlice.actions;

export default authSlice.reducer;
