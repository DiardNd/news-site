export interface AuthData {
	email: string;
	password: string;
}
export interface AuthThunk extends AuthData {
	path: string;
}

export interface User {
	id: number;
	firstName: string | null;
	lastName: string | null;
	email: string;
	avatarPath: string | null;
	createdAt: string;
	updatedAt: string;
	rating: number;
}
export interface ResponseAuthBody {
	user: User;
	accessToken: string;
}

export type AuthState = {
	authUser: User | null;
	isLoading: boolean;
	isLoggedIn: boolean;
	errorMessage: string | null;
	path: string;
};
