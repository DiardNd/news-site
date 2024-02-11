const emailRegex =
	/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

export const validateEmail = (email: string) => {
	if (!email) {
		return 'You must fill in your email';
	} else if (!emailRegex.test(email)) {
		return 'Please enter a valid email';
	}

	return null;
};

export const validatePassword = (password: string) => {
	if (!password) {
		return 'You must fill in your password';
	} else if (password.length < 7) {
		return 'Password must be at least 7 characters long';
	}

	return null;
};
