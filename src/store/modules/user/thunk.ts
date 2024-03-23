import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';

import { userPatch } from './apis';
import { FormDataPayload } from './types';

export const editUserById = createAsyncThunk(
  'user/editUserById',
  async ({ id, payload }: FormDataPayload) => {
    try {
      const data = await userPatch(payload, id);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) return error.response?.data.message;
    }
  },
);
