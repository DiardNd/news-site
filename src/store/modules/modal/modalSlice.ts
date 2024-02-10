import { PayloadAction, createSlice, isAnyOf } from '@reduxjs/toolkit';
import { authUser } from '../auth/thunk';

type ModalState = {
	isOpen: boolean;
};

const initialState: ModalState = {
	isOpen: false,
};

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		toggleSetModal(state, action: PayloadAction<{ isOpen: boolean }>) {
			state.isOpen = action.payload.isOpen;
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
