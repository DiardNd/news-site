import { ChangeEvent, useState, MouseEvent, FocusEvent } from 'react'

import styles from './Auth.module.scss'
import { signIn, signUp } from '../../api/auth'

export const Auth = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [emailDirty, setEmailDirty] = useState(false)
	const [passwordDirty, setPasswordDirty] = useState(false)
	const [emailError, setEmailError] = useState('You must fill in your email')
	const [passwordError, setPasswordError] = useState(
		'You must fill in your password'
	)

	const [errorMessage, setErrorMessage] = useState('')

	const blurHandler = ({
		target: { name },
	}: FocusEvent<HTMLInputElement>): void => {
		if (name === 'email') setEmailDirty(true)
		if (name === 'password') setPasswordDirty(true)
	}

	const emailHandler = ({
		target: { value },
	}: ChangeEvent<HTMLInputElement>): void => {
		setEmail(value)
		const emailRegex =
			/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

		if (!emailRegex.test(value)) {
			setEmailError('Please enter a valid email')
		} else {
			setEmailError('')
		}
	}

	const passwordHandler = ({
		target: { value },
	}: ChangeEvent<HTMLInputElement>): void => {
		setPassword(value)
		if (value.length < 7) {
			setPasswordError('Press 7 letters')
		} else setPasswordError('')
	}

	const handleSignUp = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		try {
			const response = await signUp({ email, password })
			setErrorMessage('')
		} catch (error: any) {
			setErrorMessage(error)
		}
	}

	const handleSignIn = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		try {
			const response = await signIn({ email, password })
		} catch (error: any) {
			setErrorMessage(error)
		}
	}

	return (
		<form className={styles.form}>
			{emailDirty && emailError && (
				<div className={styles.warning}>{emailError}</div>
			)}
			<input
				className={styles.input}
				name='email'
				value={email}
				placeholder='Email'
				onChange={emailHandler}
				onBlur={blurHandler}
				type='email'
			/>
			{passwordDirty && passwordError && (
				<div className={styles.warning}>{passwordError}</div>
			)}
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
					disabled={Boolean(passwordError || emailError)}
				>
					Sign In
				</button>
				<button
					className={styles.button}
					type='submit'
					onClick={handleSignUp}
					disabled={Boolean(passwordError || emailError)}
				>
					Register
				</button>
			</div>
			{errorMessage && <div className={styles.error}>{errorMessage}</div>}
		</form>
	)
}
