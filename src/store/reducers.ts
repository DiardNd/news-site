import { combineReducers } from '@reduxjs/toolkit';

import authReducer from './modules/auth/authSlice';
import modalReducer from './modules/modal/modalSlice';
import postReducer from './modules/post/postSlice';

export const rootReducer = combineReducers({
  modal: modalReducer,
  auth: authReducer,
  post: postReducer
});
