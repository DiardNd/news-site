import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { AuthState } from './types'
import { removeToken } from '../../../utils/localStorage'

const initialState: AuthState = {
	isLoading: false,
	authUser: null,
	isLoggedIn: false,
	errorMessage: null,
}

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		LogInUser(state, action: PayloadAction<{ isLoggedIn: boolean }>) {
			state.isLoggedIn = action.payload.isLoggedIn
		},
		logOutUser(state) {
			state.isLoggedIn = false
			state.authUser = null
			removeToken()
		},
	},
})

export const { LogInUser, logOutUser } = authSlice.actions

export default authSlice.reducer
