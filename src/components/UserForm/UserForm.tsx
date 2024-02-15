import { ChangeEvent, FocusEvent, SyntheticEvent, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks';
import { editUserById } from '../../store/modules/user/thunk';

import { validateEmail, validatePassword } from '../../utils';
import styles from './UserForm.module.scss';

export const UserForm = () => {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(state => state.auth.authUser);

	const [firstName, setFirstName] = useState(currentUser?.firstName || '');
	const [lastName, setLastName] = useState(currentUser?.lastName || '');
	const [email, setEmail] = useState(currentUser!.email);
	const [file, setFile] = useState<File | null>(null);
	const [password, setPassword] = useState('');
	const [emailDirty, setEmailDirty] = useState(false);
	const [passwordDirty, setPasswordDirty] = useState(false);
	const [emailError, setEmailError] = useState('You must fill in your email');
	const [passwordError, setPasswordError] = useState('You must fill in your password');

	const blurHandler = ({ target: { name } }: FocusEvent<HTMLInputElement>) => {
		if (name === 'email') setEmailDirty(true);
		if (name === 'password') setPasswordDirty(true);
	};

	const handleEmailChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
		setEmail(value);
		setEmailError(validateEmail(value) || '');
	};

	const handlePasswordChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
		setPassword(value);
		setPasswordError(validatePassword(value) || '');
	};

	const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = event.target.files?.[0];
		if (selectedFile) {
			setFile(selectedFile);
		}
	};

	const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (currentUser !== null) {
			const formData = new FormData();
			formData.append('email', email);
			formData.append('password', password);
			formData.append('firstName', firstName);
			formData.append('lastName', lastName);
			if (file) {
				formData.append('file', file);
			}

			dispatch(
				editUserById({
					id: currentUser.id,
					payload: formData,
				})
			);
		}
	};

	if (currentUser) {
		return (
			<form
				className={styles.form}
				onSubmit={handleSubmit}>
				<input
					className={styles.input}
					name='firstName'
					value={firstName}
					onChange={e => setFirstName(e.target.value)}
					placeholder='First Name'
				/>
				<input
					className={styles.input}
					name='lastName'
					value={lastName}
					onChange={e => setLastName(e.target.value)}
					placeholder='Last Name'
				/>
				{emailDirty && emailError && <div className={styles.warning}>{emailError}</div>}
				<input
					className={styles.input}
					name='email'
					placeholder='Email'
					value={email}
					type='email'
					onBlur={blurHandler}
					onChange={handleEmailChange}
				/>
				{passwordDirty && passwordError && <div className={styles.warning}>{passwordError}</div>}
				<input
					className={styles.input}
					name='password'
					value={password}
					type='password'
					onBlur={blurHandler}
					onChange={handlePasswordChange}
					placeholder='Password'
				/>
				<input
					className={styles.Input}
					type='file'
					name='file'
					accept='image/jpeg,image/png,image/gif'
					onChange={handleFileChange}
					required
				/>
				<button
					className={styles.button}
					type='submit'>
					Submit
				</button>
			</form>
		);
	}
};
