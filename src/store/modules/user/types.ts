export interface UserRequest {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	file: string;
}

export interface editUserThunk {
	id: number;
	payload: UserRequest;
}
