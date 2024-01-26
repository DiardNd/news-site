import { useState } from 'react'
import styles from './Auth.module.scss'
import { signIn, signUp } from '../../api/auth'

export const Auth = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailError, setEmailError] = useState('')

	const isValidEmail = (email: string) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		return emailRegex.test(email)
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
		setPasswordError('')
	}

	const handleSignUp = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		try {
			const response = await signUp({ email, password })
			setErrorMessage('')
		} catch (error: any) {
			setErrorMessage(error) // чтото надо типизировать
		}
	}

	const handleSignIn = async (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		try {
			const response = await signIn({ email, password })
		} catch (err1) {
			setErrorMessage(err1)
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
				<button className={styles.button} type='submit' onClick={handleSignIn}>
					Sign In
				</button>
				<button className={styles.button} type='submit' onClick={handleSignUp}>
					Register
				</button>
			</div>
			{errorMessage && <div className={styles.error}>{errorMessage}</div>}
		</form>
	)
}
