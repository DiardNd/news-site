import { createAsyncThunk } from '@reduxjs/toolkit'
import { AuthData } from './types'

import { AxiosError } from 'axios'
import { authFetch, whoAmI } from './apis'
import { RootState } from '../..'

export const authUser = createAsyncThunk(
	'modal/authUser',
	async (payload: AuthData, { getState, rejectWithValue }) => {
		const state: RootState = getState()
		try {
			return await authFetch(payload, path)
		} catch (error) {
			if (error instanceof AxiosError)
				return rejectWithValue(error.response?.data.message)
		}
	}
)

export const getUserByToken = createAsyncThunk(
	'auth/getUserByToken',
	async () => {
		try {
			const user = await whoAmI()
			return user
		} catch (error) {
			if (error instanceof AxiosError) return error.response?.data.message
		}
	}
)
