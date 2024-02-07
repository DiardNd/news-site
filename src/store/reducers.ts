import { combineReducers } from '@reduxjs/toolkit'
import modalReducer from './modules/modal/modalSlice'
import authReducer from './modules/auth/authSlice'

export const rootReducer = combineReducers({
	modal: modalReducer,
	auth: authReducer,
})
