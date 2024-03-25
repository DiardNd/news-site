import {
  ChangeEvent,
  FocusEvent,
  MouseEvent,
  useReducer
} from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { authUser } from '../../store/modules/auth/thunk';
import { checkIsEmailValid, checkIsPasswordValid, authReducer } from '../../utils';

import styles from './Auth.module.scss';

interface AuthFormState {
  email: string;
  password: string;
  emailError: string;
  passwordError: string;
}

const initialState: AuthFormState = {
  email: '',
  password: '',
  emailError: '',
  passwordError: ''
};


export const Auth = () => {
  const reduxDispatch = useAppDispatch();
  const errorMessage = useAppSelector(state => state.auth.errorMessage);
  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleChange = (field: string, value: string) => {
    dispatch({
      type: 'CHANGE',
      payload: {
        field,
        value
      }
    });
  };

  const isFormValid = !state.emailError && !state.passwordError;

  const blurHandler = ({ target: { name } }: FocusEvent<HTMLInputElement>) => {
    if (name === 'email' && !state.emailError && !state.email) handleChange('emailError', 'You must fill in your email');
    
    if (name === 'password' && !state.passwordError && !state.password) handleChange('passwordError', 'You must fill in your password');
  };

  const handleEmailChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    handleChange('email', value);

    handleChange('emailError',checkIsEmailValid(value) || '');
  };

  const handlePasswordChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    handleChange('password', value);

    handleChange('passwordError', checkIsPasswordValid(value) || '');
  };

  const handleSignUp = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    reduxDispatch(authUser({ email: state.email, password: state.password, path: '/auth/signup' }));
  };

  const handleSignIn = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    reduxDispatch(authUser({ email: state.email, password :state.password, path: '/auth/login' }));
  };

  return (
    <form className={styles.form}>
      {state.emailError && <div className={styles.warning}>{state.emailError}</div>}
      <input
        className={styles.input}
        name='email'
        value={state.email}
        placeholder='Email'
        onChange={handleEmailChange}
        onBlur={blurHandler}
        type='email'
      />
      { state.passwordError && <div className={styles.warning}>{state.passwordError}</div>}
      <input
        className={styles.input}
        name='password'
        placeholder='Password'
        value={state.password}
        onChange={handlePasswordChange}
        onBlur={blurHandler}
        autoComplete='off'
        type='password'
      />
      <div className={styles.blockButton}>
        <button
          className={styles.button}
          type='submit'
          onClick={handleSignIn}
          disabled={!isFormValid}>
					Sign In
        </button>
        <button
          className={styles.button}
          type='submit'
          onClick={handleSignUp}
          disabled={!isFormValid}>
					Register
        </button>
      </div>
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
    </form>
  );
};
