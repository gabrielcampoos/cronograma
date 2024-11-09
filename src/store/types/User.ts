export interface User {
	username: string;
	password: string;
}

export interface UserState {
	id: string;
	username: string;
	token: string;
	isLogged: boolean;
	loading: boolean;
}
