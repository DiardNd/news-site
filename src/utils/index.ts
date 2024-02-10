export { getToken } from './localStorage'

export const getCurrentImage = (
	path: string | null,
	defaultImage: string
): string => {
	return path !== null
		? `${import.meta.env.VITE_APP_API_URL}${path}`
		: defaultImage
}

export const validateEmail = (email: string): string | null => {
	const emailRegex =
		/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i

	if (!email) {
		return 'You must fill in your email'
	} else if (!emailRegex.test(email)) {
		return 'Please enter a valid email'
	}

	return null
}

export const validatePassword = (password: string): string | null => {
	if (!password) {
		return 'You must fill in your password'
	} else if (password.length < 7) {
		return 'Password must be at least 7 characters long'
	}

	return null
}
