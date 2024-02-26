import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';

import { authUser } from '../auth/thunk';
import { editUserById } from '../user/thunk';
import { deletePostById, editPostById } from '../post/thunk';

export enum ModalType {
  SIGN_IN = 'SIGN IN',
  EDIT_USER = 'EDIT USER',
  EDIT_POST = 'EDIT POST',
  DELETE_POST = 'DELETE POST'
}

type ModalState = {
  isOpen: boolean;
  modalType: ModalType;
};

const initialState: ModalState = {
  isOpen: false,
  modalType: ModalType.SIGN_IN
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    toggleSetModal(
      state,
      action: PayloadAction<{ isOpen: boolean; modalType: ModalType }>
    ) {
      state.isOpen = action.payload.isOpen;
      state.modalType = action.payload.modalType;
    }
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(authUser.fulfilled, editUserById.fulfilled, editPostById.fulfilled, deletePostById.fulfilled),
      (state) => {
        state.isOpen = false;
      }
    );
  }
});
export const { toggleSetModal } = modalSlice.actions;

export default modalSlice.reducer;
