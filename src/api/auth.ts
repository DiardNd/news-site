import { AxiosError, AxiosResponse } from 'axios'

import api from '../modules/axios'
import { setToken } from '../utils/localStorage'

export type SignInRequestType = {
	email: string
	password: string
}

export type SignInResponseType = {
	status: string
}

export const signUp = async (payload: SignInRequestType) => {
	try {
		const response = await api.post('/auth/signup', payload)
		console.log('response', response)
		const { data } = response ?? {}
		const { accessToken } = data ?? {}
		setToken(accessToken)
		// throw new Error() //
	} catch (error: any) {
		const err1 = error.response.data.errors
		// const err1 = { error: { response: { data: { errors } } } };
		throw err1
		console.log(error)
	}
}
export const signIn = async (payload: SignInRequestType) => {
	try {
		const response = await api.post('/auth/login', payload)
		const { data } = response ?? {}
		const { accessToken } = data ?? {}
		setToken(accessToken)
	} catch (error: any) {
		const err1 = error.response.data.message
		throw err1
		// alertService.push({title: 'Произошел обсер', message: error.message })
	}
}

// export const authFetch = async (payload: AuthData, path: string): Promise<ResponseAuthBody> => {
//     const {
//       data: { user, accessToken },
//     } = await api.post(path, payload);
//     setToken(accessToken);

//     return user;
//   };
