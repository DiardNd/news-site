import { ChangeEvent, useState, MouseEvent, FocusEvent } from 'react';

import styles from './Auth.module.scss';

import { validateEmail, validatePassword } from '../../utils';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { authUser } from '../../store/modules/auth/thunk';

export const Auth = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [emailDirty, setEmailDirty] = useState(false);
	const [passwordDirty, setPasswordDirty] = useState(false);
	const [emailError, setEmailError] = useState('You must fill in your email');
	const [passwordError, setPasswordError] = useState('You must fill in your password');

	const dispatch = useAppDispatch();
	const errorMessage = useAppSelector(state => state.auth.errorMessage);

	const blurHandler = ({ target: { name } }: FocusEvent<HTMLInputElement>) => {
		if (name === 'email') setEmailDirty(true);
		if (name === 'password') setPasswordDirty(true);
	};

	const emailHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
		setEmail(value);
		setEmailError(validateEmail(value) || '');
	};

	const passwordHandler = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
		setPassword(value);
		setPasswordError(validatePassword(value) || '');
	};

	const handleSignUp = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(authUser({ email, password, path: '/auth/signup' }));
	};

	const handleSignIn = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		dispatch(authUser({ email, password, path: '/auth/login' }));
	};

	return (
		<form className={styles.form}>
			{emailDirty && emailError && <div className={styles.warning}>{emailError}</div>}
			<input
				className={styles.input}
				name='email'
				value={email}
				placeholder='Email'
				onChange={emailHandler}
				onBlur={blurHandler}
				type='email'
			/>
			{passwordDirty && passwordError && <div className={styles.warning}>{passwordError}</div>}
			<input
				className={styles.input}
				name='password'
				placeholder='Password'
				value={password}
				onChange={passwordHandler}
				onBlur={blurHandler}
				autoComplete='off'
				type='password'
			/>
			<div className={styles.blockButton}>
				<button
					className={styles.button}
					type='submit'
					onClick={handleSignIn}
					disabled={Boolean(passwordError || emailError)}>
					Sign In
				</button>
				<button
					className={styles.button}
					type='submit'
					onClick={handleSignUp}
					disabled={Boolean(passwordError || emailError)}>
					Register
				</button>
			</div>
			{errorMessage && <div className={styles.error}>{errorMessage}</div>}
		</form>
	);
};
