import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authUser } from '../auth/thunk';

type ModalState = {
	isOpen: boolean;
	modalType: string;
};

const initialState: ModalState = {
	isOpen: false,
	modalType: 'SIGN UP',
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		toggleSetModal(state, action: PayloadAction<{ isOpen: boolean; modalType: string }>) {
			state.isOpen = action.payload.isOpen;
			state.modalType = action.payload.modalType;
		},
	},
	extraReducers: builder => {
		builder.addMatcher(isAnyOf(authUser.fulfilled), state => {
			state.isOpen = false;
		});
	},
});
export const { toggleSetModal } = modalSlice.actions;

export default modalSlice.reducer;
