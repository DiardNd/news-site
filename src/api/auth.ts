import api from '../modules/axios';
import { setToken } from '../utils/localStorage';

export type SignInRequestType = {
	email: string;
	password: string;
};

export type SignInResponseType = {
	status: string;
};

export const signUp = async (payload: SignInRequestType) => {
	try {
		const response = await api.post('/auth/signup', payload);
		console.log('response', response);
		const { data } = response ?? {};
		const { accessToken } = data ?? {};
		setToken(accessToken);
	} catch (error: any) {
		const serverError = error.response.data.errors;
		throw serverError;
	}
};
export const signIn = async (payload: SignInRequestType) => {
	try {
		const response = await api.post('/auth/login', payload);
		console.log('response', response);
		const { data } = response ?? {};
		const { accessToken } = data ?? {};
		setToken(accessToken);
	} catch (error: any) {
		const serverError = error.response.data.message;
		throw serverError;
	}
};
