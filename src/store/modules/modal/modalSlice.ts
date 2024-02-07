import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: ModalState = {
	isOpen: false,
}

const modalSlice = createSlice({
	name: 'modal',
	initialState,
	reducers: {
		toggleSetModal(state, action: PayloadAction<{ isOpen: boolean }>) {
			state.isOpen = action.payload.isOpen
		},
	},
	// extraReducers: builder => {
	// 	builder.addMatcher(isAnyOf(authUser.fulfilled), state => {
	// 		state.isOpen = false
	// 	})
	// },
})
export const { toggleSetModal } = modalSlice.actions

export default modalSlice.reducer
