import { PostFormState } from 'components/UserForm/types';
import { AuthFormState } from 'store/modules/auth/types';

export const postReducer = (state: PostFormState, action: { type: string, payload: { field: string, value: string |boolean| File } }): PostFormState => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.payload.field]: action.payload.value
      };
    default:
      return state;
  }
};

export const authReducer = (state: AuthFormState, action: { type: string, payload: { field: string, value: string} }): AuthFormState => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.payload.field]: action.payload.value
      };
    default:
      return state;
  }
};
