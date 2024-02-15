import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { userPatch } from './apis';
import { editUserThunk } from './types';

export const editUserById = createAsyncThunk(
	'user/editUserById',
	async ({ id, payload }: editUserThunk) => {
		try {
			const data = await userPatch(payload, id);
			console.log(payload);
			return data;
		} catch (error) {
			if (error instanceof AxiosError) return error.response?.data.message;
		}
	}
);
