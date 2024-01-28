// 1 положить токен
//2 взять токен
// 3 удалить токен

export const setToken = (accessToken: string): void =>
	localStorage.setItem('accessToken', accessToken)

export const getToken = (): string | null => localStorage.getItem('accessToken')

export const removeToken = (): void => localStorage.removeItem('accessToken')
